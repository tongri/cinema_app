from crud.place_crud import (
    list_places,
    get_place_by_id,
    get_place_by_name,
    insert_place,
    is_place_busy,
    update_place,
    delete_place,
)
from schemas.place_schemas import PlaceIn, PlaceUpdate
from utils.exceptions_utils import ObjNotFoundException, ObjUniqueException, ConflictException
from utils.service_base import BaseService


class PlaceService(BaseService):
    async def get_place(self, place_id: int):
        place = await get_place_by_id(self.db, place_id)
        if not place:
            raise ObjNotFoundException("Place", "id", place_id)
        return place

    async def list_places(self):
        return await list_places(self.db)

    async def create_place(self, place: PlaceIn):
        if await get_place_by_name(self.db, place.name):
            raise ObjUniqueException("Place", "name", place.name)

        new_place_id = await insert_place(self.db, place)
        return new_place_id

    async def update_place(self, place_id: int, place: PlaceUpdate):
        if not await get_place_by_id(self.db, place_id):
            raise ObjNotFoundException("Place", "id", place_id)

        if place.name and (place_with_same_name := await get_place_by_name(self.db, place.name)):
            if place_id != place_with_same_name.id:
                raise ObjUniqueException("Place", "name", place.name)

        await update_place(self.db, place_id, place)

    async def delete_place(self, place_id: int):
        if await is_place_busy(self.db, place_id):
            raise ConflictException("Place has busy shows")
        await delete_place(self.db, place_id)
