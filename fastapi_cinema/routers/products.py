from fastapi import APIRouter, Depends
from fastapi_pagination import Page
from starlette import status
from dependencies import get_restaurateur, async_get_db
from services.product_service import ProductService
from schemas.product_schemas import ProductUpdate, ProductIn, ProductOut
from sqlalchemy.ext.asyncio import AsyncSession

from utils.pagination_utils import PaginationParams, from_response_to_page

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=Page[ProductOut])
async def read_products(
    page: PaginationParams = Depends(PaginationParams), db: AsyncSession = Depends(async_get_db)
):
    return from_response_to_page(page, await ProductService(db).list_products())


@router.get("/{product_id}/", response_model=ProductOut)
async def retrieve_product(product_id: int, db: AsyncSession = Depends(async_get_db)):
    return await ProductService(db).get_product(product_id)


@router.post("/", response_model=ProductOut)
async def create_product(
    product: ProductIn, _=Depends(get_restaurateur), db: AsyncSession = Depends(async_get_db)
):
    last_record_id = await ProductService(db).create_product(product)
    return {**product.dict(), "id": last_record_id}


@router.patch("/{product_id}/", response_model=ProductOut)
async def patch_product(
    product_id: int, product: ProductUpdate, _=Depends(get_restaurateur), db: AsyncSession = Depends(async_get_db)
):
    await ProductService(db).update_product(product_id, product)
    return await ProductService(db).get_product(product_id)


@router.delete("/{product_id}/", status_code=status.HTTP_200_OK)
async def remove_product(
    product_id: int, _=Depends(get_restaurateur), db: AsyncSession = Depends(async_get_db)
):
    await ProductService(db).delete_product(product_id)
