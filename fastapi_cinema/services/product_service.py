from crud.product_crud import (
    get_product_by_id,
    list_products,
    get_product_by_name,
    insert_product,
    update_product,
    is_product_busy,
    delete_product,
)
from schemas.product_schemas import ProductIn, ProductUpdate
from utils.exceptions_utils import ObjNotFoundException, ObjUniqueException, ConflictException, NoContentException
from utils.service_base import BaseService


class ProductService(BaseService):
    async def get_product(self, product_id: int):
        product = await get_product_by_id(self.db, product_id)
        if not product:
            raise ObjNotFoundException("Product", "id", product_id)
        return product

    async def list_products(self):
        return await list_products(self.db)

    async def create_product(self, product: ProductIn):
        if await get_product_by_name(self.db, product.name):
            raise ObjUniqueException("Product", "name", product.name)

        return await insert_product(self.db, product)

    async def update_product(self, product_id: int, product: ProductUpdate):
        product_to_update = await self.get_product(product_id)

        if product.name and product_to_update.name != product.name and \
                (product_with_same_name := await get_product_by_name(self.db, product.name)):
            if product_id != product_with_same_name.id:
                raise ObjUniqueException("Product", "name", product.name)

        await update_product(self.db, product_id, product)

    async def delete_product(self, product_id: int):
        if not await get_product_by_id(self.db, product_id):
            raise NoContentException
        if await is_product_busy(self.db, product_id):
            raise ConflictException("Product has been already bought")
        await delete_product(self.db, product_id)
