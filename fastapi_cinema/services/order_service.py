from datetime import datetime, timedelta
from enum import Enum

from crud.order_crud import (
    create_order,
    list_orders,
    get_orders_amount_by_show,
    list_orders_by_films,
    get_order,
    update_order_status,
    list_orders_admin,
)
from crud.place_crud import get_place_by_id
from crud.product_order_crud import update_product_orders_status_by_order
from crud.show_crud import retrieve_show_short
from services.products_order_service import ProductOrderStatuses
from utils.exceptions_utils import ConflictException, ObjNotFoundException
from utils.service_base import BaseService
from schemas.order_schemas import OrderIn


class OrderStatuses(Enum):
    accepted = "accepted"
    declined = "declined"

    @classmethod
    def all(cls) -> list[str]:
        return [i.value for i in cls]


class OrderService(BaseService):
    async def create_order(self, user_id: int, show_id: int, order: OrderIn):
        show = await retrieve_show_short(self.db, show_id)

        if not show:
            raise ObjNotFoundException("Show", "id", show_id)

        if datetime.now() + timedelta(hours=2) >= show.show_time_start:
            raise ConflictException("You can maximum in two hours before start")

        place = await get_place_by_id(self.db, show.place_id)

        show_busy = await get_orders_amount_by_show(self.db, show_id)
        if show_busy.count + order.amount > place.size:
            raise ConflictException("Not enough free places")

        order_created = await create_order(self.db, user_id, show_id, order)
        await self.db.commit()
        return order_created

    async def get_all_orders(self, user_id: int):
        return await list_orders(self.db, user_id)

    async def get_all_orders_admin(self):
        return await list_orders_admin(self.db)

    async def get_order_by_show(self):
        return await list_orders_by_films(self.db)

    async def update_order_status(self, order_id: int, status: str):
        if not (order := await get_order(self.db, order_id)):
            raise ObjNotFoundException("Order", "id", order_id)

        if order.status == status:
            raise ConflictException(f"Order {order_id} already has status {status}")

        if order.status in OrderStatuses.all():
            raise ConflictException(
                f"Order {order_id} already has already been {order.status}"
            )

        show_busy = await get_orders_amount_by_show(self.db, order.show_id)
        show = await retrieve_show_short(self.db, order.show_id)

        if show.show_time_start < datetime.now():
            await update_product_orders_status_by_order(
                self.db, order_id, "blocked"
            )
            await update_order_status(self.db, order_id, OrderStatuses.declined.value)
            await self.db.commit()
            raise ConflictException(
                "You can't accept order to outdated show. Setting to declined"
            )

        place = await get_place_by_id(self.db, show.place_id)

        if order.amount + show_busy.count > place.size:
            raise ConflictException("Not enough free places")

        await update_order_status(self.db, order_id, status)

        await update_product_orders_status_by_order(
            self.db,
            order_id,
            "pending" if status == OrderStatuses.accepted.value
            else "blocked",
        )

        await self.db.commit()
