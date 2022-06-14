from fastapi import Depends, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status
from fastapi_pagination import Page
from dependencies import get_current_user, async_get_db, get_admin
from schemas.order_schemas import OrderIn, OrderOut, OrderByShow
from services.order_service import OrderService, OrderStatuses
from schemas.user_schemas import UserOut
from utils.pagination_utils import PaginationParams, from_response_to_page

router = APIRouter(tags=["orders"])


@router.post("/shows/{show_id}/create_order/", status_code=status.HTTP_200_OK)
async def create_order(
    show_id: int,
    order: OrderIn,
    db: AsyncSession = Depends(async_get_db),
    current_user: UserOut = Depends(get_current_user),
):
    order_id = await OrderService(db).create_order(current_user.id, show_id, order)
    return {"id": order_id}


@router.get("/orders/", response_model=Page[OrderOut])
async def list_orders(
    page: PaginationParams = Depends(PaginationParams),
    db: AsyncSession = Depends(async_get_db),
    current_user: UserOut = Depends(get_current_user),
):
    return from_response_to_page(page, await OrderService(db).get_all_orders(current_user.id))


@router.get("/orders/admin_view/", response_model=Page[OrderOut])
async def list_orders_admin(
    page: PaginationParams = Depends(PaginationParams),
    db: AsyncSession = Depends(async_get_db),
    _=Depends(get_admin),
):
    return from_response_to_page(page, await OrderService(db).get_all_orders_admin())


@router.get("/orders_by_film/", response_model=Page[OrderByShow])
async def list_film_orders(
    page: PaginationParams = Depends(PaginationParams),
    db: AsyncSession = Depends(async_get_db),
    _=Depends(get_admin),
):
    return from_response_to_page(page, await OrderService(db).get_order_by_show())


@router.patch("/orders/{order_id}/", status_code=status.HTTP_200_OK)
async def update_product_order_status(
    order_id: int,
    new_status: OrderStatuses,
    db: AsyncSession = Depends(async_get_db),
    _=Depends(get_admin),
):
    await OrderService(db).update_order_status(order_id, new_status.value)
