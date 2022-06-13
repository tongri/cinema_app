from crud.order_crud import create_order, list_orders, get_orders_amount_by_show, list_orders_by_films
from crud.place_crud import get_place_by_id
from crud.show_crud import retrieve_show_short
from utils.exceptions_utils import ConflictException, ObjNotFoundException
from utils.service_base import BaseService
from schemas.order_schemas import OrderIn


class OrderService(BaseService):
    async def create_order(self, user_id: int, show_id: int, order: OrderIn):
        show = await retrieve_show_short(self.db, show_id)
        if not show:
            raise ObjNotFoundException("Show", "id", show_id)
        place = await get_place_by_id(self.db, show.place_id)

        show_busy = await get_orders_amount_by_show(self.db, show_id)
        if show_busy.count + order.amount > place.size:
            raise ConflictException("Not enough free places")

        order_created = await create_order(self.db, user_id, show_id, order)
        await self.db.commit()
        return order_created

    async def get_all_orders(self, user_id: int):
        return await list_orders(self.db, user_id)

    async def get_order_by_show(self):
        return await list_orders_by_films(self.db)
