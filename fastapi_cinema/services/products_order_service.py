from datetime import datetime, timedelta
from enum import Enum

from crud.order_crud import get_order, get_show_by_order_id
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
    accepted = "accepted"
    declined = "declined"

    @classmethod
    def all(cls) -> list[str]:
        return [i.value for i in cls]


class ProductsOrderService(BaseService):

    async def bulk_create_products_orders(
        self, user: UserOut, order_id: int, products_orders: list[ProductOrderIn]
    ):
        if not (order := await get_order(self.db, order_id)):
            raise ObjNotFoundException("Order", "id", order_id)

        show = await get_show_by_order_id(self.db, order.id)
        if datetime.now() + timedelta(hours=2) >= show.show_time_start:
            raise ConflictException("You can maximum in two hours before start")

        if order.user_id != user.id:
            raise ConflictException(
                "You can't attach products order to not your order"
            )

        await bulk_create_orders(self.db, order_id, products_orders)
        await self.db.commit()

    async def fetch_products_orders(self, user: UserOut):
        return await list_products_orders(self.db, user.id)

    async def fetch_admin_products_orders(self):
        return await list_all_products_orders(self.db)

    async def update_order_status(self, product_order_id: int, status: str):
        if not (product_order := await get_product_order(self.db, product_order_id)):
            raise ObjNotFoundException("Product order", "id", product_order_id)

        show = await get_show_by_order_id(self.db, product_order.order_id)

        if show.show_time_start < datetime.now():
            raise ConflictException(
                "You can't accept order to outdated show. Setting to declined"
            )

        if product_order.status in ProductOrderStatuses.all():
            raise ConflictException(f"Product order {product_order_id} already has status {status}")

        if product_order.status == "blocked":
            raise ConflictException(f"Product order {product_order_id} already has status blocked")

        await update_product_order_status(self.db, product_order_id, status)
        await self.db.commit()
