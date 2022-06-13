from crud.place_crud import (
    list_places,
    get_place_by_id,
    get_place_by_name,
    insert_place,
    is_place_busy,
    update_place,
    delete_place, get_max_busy_by_id,
)
from schemas.place_schemas import PlaceIn, PlaceUpdate
from utils.exceptions_utils import ObjNotFoundException, ObjUniqueException, ConflictException, NoContentException
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
        await self.db.commit()
        return new_place_id

    async def update_place(self, place_id: int, place: PlaceUpdate):
        if not await get_place_by_id(self.db, place_id):
            raise ObjNotFoundException("Place", "id", place_id)

        if place.name and (place_with_same_name := await get_place_by_name(self.db, place.name)):
            if place_id != place_with_same_name.id:
                raise ObjUniqueException("Place", "name", place.name)

        if place.size and place.size < (max_busy := await get_max_busy_by_id(self.db, place_id)):
            raise ConflictException(
                f"You can't set place size {place.size} because there is show with sold {max_busy} tickets on "
                f"this place"
            )

        await update_place(self.db, place_id, place)
        await self.db.commit()

    async def delete_place(self, place_id: int):
        if not await get_place_by_id(self.db, place_id):
            raise NoContentException

        if await is_place_busy(self.db, place_id):
            raise ConflictException("Place has busy shows")

        await delete_place(self.db, place_id)
        await self.db.commit()
