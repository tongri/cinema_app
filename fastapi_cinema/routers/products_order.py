from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status
from fastapi_pagination import Page
from dependencies import async_get_db, get_current_user, get_restaurateur
from schemas.products_order_shemas import ProductOrderIn, ProductOrderOut, ProductOrderOutAdmin
from schemas.user_schemas import UserOut
from services.products_order_service import ProductsOrderService, ProductOrderStatuses
from utils.pagination_utils import PaginationParams, from_response_to_page

router = APIRouter(prefix="/products_order", tags=["products_order"])


@router.post("/{order_id}/", status_code=status.HTTP_200_OK)
async def bulk_create_products_orders(
    order_id: int,
    products_orders: list[ProductOrderIn],
    db: AsyncSession = Depends(async_get_db),
    user: UserOut = Depends(get_current_user),
):
    await ProductsOrderService(db).bulk_create_products_orders(
        user, order_id, products_orders
    )


@router.get("/rest_view/", response_model=Page[ProductOrderOutAdmin])
async def admin_read_products_orders(
    page: PaginationParams = Depends(PaginationParams),
    db: AsyncSession = Depends(async_get_db),
    _=Depends(get_restaurateur)
):
    return from_response_to_page(page, await ProductsOrderService(db).fetch_admin_products_orders())


@router.get("/", response_model=Page[ProductOrderOut])
async def read_products_orders(
    page: PaginationParams = Depends(PaginationParams),
    db: AsyncSession = Depends(async_get_db),
    user: UserOut = Depends(get_current_user)
):
    return from_response_to_page(page, await ProductsOrderService(db).fetch_products_orders(user))


@router.patch("/{product_order_id}/", status_code=status.HTTP_200_OK)
async def update_product_order_status(
    product_order_id: int,
    new_status: ProductOrderStatuses,
    db: AsyncSession = Depends(async_get_db),
    _=Depends(get_restaurateur),
):
    await ProductsOrderService(db).update_order_status(product_order_id, new_status.value)
