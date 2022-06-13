from crud.film_crud import (
    list_films,
    get_film_by_id,
    insert_film,
    get_film_by_name,
    update_film,
    is_legal_target_validate,
    delete_film,
    is_film_busy,
)
from schemas.film_schemas import FilmIn, FilmUpdate
from utils.exceptions_utils import ObjNotFoundException, ObjUniqueException, ConflictException, NoContentException
from utils.service_base import BaseService


class FilmService(BaseService):
    async def get_film(self, film_id: int):
        film = await get_film_by_id(self.db, film_id)
        if not film:
            raise ObjNotFoundException("Film", "id", film_id)
        return film

    async def list_films(self):
        return await list_films(self.db)

    async def create_film(self, film: FilmIn):
        if await get_film_by_name(self.db, film.name):
            raise ObjUniqueException("Film", "name", film.name)

        inserted_film = await insert_film(self.db, film)
        await self.db.commit()
        return inserted_film

    async def update_film(self, film_id: int, film: FilmUpdate):
        film_to_update = await self.get_film(film_id)

        if film.name and (film_with_same_name := await get_film_by_name(self.db, film.name)):
            if film_id != film_with_same_name.id:
                raise ObjUniqueException("Film", "name", film.name)

        prev_begin_date = film_to_update._asdict()["begin_date"]
        prev_end_date = film_to_update._asdict()["end_date"]

        if film.begin_date and not film.end_date and film.begin_date > prev_end_date:
            raise ConflictException("Film's begin date must be set after its end")
        elif film.end_date and not film.begin_date and film.end_date < prev_begin_date:
            raise ConflictException("Film's end date must be set before its begin")

        if not is_legal_target_validate(self.db, film_id, film.begin_date, film.end_date):
            raise ConflictException("Can't move to specified date - shows are held at that time")

        await update_film(self.db, film_id, film)
        await self.db.commit()

    async def delete_film(self, film_id: int):

        if not await get_film_by_id(self.db, film_id):
            raise NoContentException

        if await is_film_busy(self.db, film_id):
            raise ConflictException("Film has busy shows")
        await delete_film(self.db, film_id)
        await self.db.commit()
