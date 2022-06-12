from enum import Enum

from crud.order_crud import get_order
from crud.product_order_crud import (
    bulk_create_orders,
    list_products_orders,
    get_product_order,
    update_product_order_status, list_all_products_orders
)
from schemas.products_order_shemas import ProductOrderIn
from schemas.user_schemas import UserOut
from utils.exceptions_utils import ObjNotFoundException, ConflictException
from utils.service_base import BaseService


class ProductOrderStatuses(Enum):
    pending = "pending"
    accepted = "accepted"
    declined = "declined"


class ProductsOrderService(BaseService):

    async def bulk_create_products_orders(
        self, user: UserOut, order_id: int, products_orders: list[ProductOrderIn]
    ):
        if not (order := await get_order(self.db, order_id)):
            raise ObjNotFoundException("Order", "id", order_id)

        if order.user_id != user.id:
            raise ConflictException(
                "You can't attach products order to not your order"
            )

        await bulk_create_orders(self.db, order_id, products_orders)

    async def fetch_products_orders(self, user: UserOut):
        return await list_products_orders(self.db, user.id)

    async def fetch_admin_products_orders(self):
        return await list_all_products_orders(self.db)

    async def update_order_status(self, order_id: int, status: str):
        if not (product_order := await get_product_order(self.db, order_id)):
            raise ObjNotFoundException("Product", "id", order_id)

        if product_order.status == status:
            raise ConflictException(f"Product order {order_id} already has status {status}")

        await update_product_order_status(self.db, order_id, status)
