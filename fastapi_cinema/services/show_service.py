from datetime import timedelta, datetime

from crud.place_crud import get_place_by_id
from crud.show_crud import (
    list_shows,
    retrieve_show,
    get_crossed_place_target,
    insert_show,
    update_show,
    delete_show,
    is_show_busy,
    retrieve_show_short,
)
from schemas.show_schemas import ShowIn, ShowUpdate
from services.film_service import FilmService
from services.place_service import PlaceService
from utils.exceptions_utils import ObjNotFoundException, ConflictException, NoContentException
from utils.service_base import BaseService
from crud.film_crud import get_film_by_id


class ShowService(BaseService):
    async def retrieve_show(self, show_id: int):
        show = await retrieve_show(self.db, show_id)
        if not show:
            raise ObjNotFoundException("Show", "id", show_id)
        return show

    async def retrieve_show_short(self, show_id: int):
        film = await retrieve_show_short(self.db, show_id)
        if not film:
            raise ObjNotFoundException("Show", "id", show_id)
        return film

    async def list_shows(self):
        return await list_shows(self.db)

    async def create_show(self, show: ShowIn):
        film = await FilmService(self.db).get_film(show.film_id)

        place = await PlaceService(self.db).get_place(show.place_id)

        show_time_end = show.show_time_start + timedelta(minutes=film.lasts_minutes)

        ShowService.check_show_in_films_range_or_raise_exception(film, show.show_time_start)

        await self.check_show_time_is_valid(show.place_id, show.show_time_start, show_time_end)

        new_show_id = await insert_show(self.db, show)
        await self.db.commit()
        return new_show_id

    async def check_show_time_is_valid(
            self, place_id: int, show_time_start: datetime, show_time_end: datetime
    ):
        if await get_crossed_place_target(self.db, place_id, show_time_start, show_time_end):
            raise ConflictException("There is already show held the same time in the same place")

    @staticmethod
    def check_show_in_films_range_or_raise_exception(film, show_time_start: datetime):
        if not (film.begin_date <= show_time_start.date() <= film.end_date):
            raise ConflictException("Show must be held during film's shows")

    async def update_show(self, show_id: int, show: ShowUpdate):
        show_to_update = await self.retrieve_show_short(show_id)

        if show.film_id:
            film = await FilmService(self.db).get_film(show.film_id)
        else:
            film = await get_film_by_id(self.db, show_to_update.film_id)

        if show.place_id:
            place = await PlaceService(self.db).get_place(show.place_id)
        else:
            place = await get_place_by_id(self.db, show_to_update.place_id)

        if show.show_time_start:
            show_time_end = show.show_time_start + timedelta(minutes=film.lasts_minutes)
        else:
            show_time_end = show_to_update.show_time_start + timedelta(minutes=film.lasts_minutes)

        if any(
            show_id != sh.id
            for sh in await get_crossed_place_target(
                self.db, place.id, show.show_time_start or show_to_update.show_time_start, show_time_end
            )
        ):
            raise ConflictException(
                "there is already a show running the same time on the same place"
            )

        if show.show_time_start and show.film_id:
            ShowService.check_show_in_films_range_or_raise_exception(film, show.show_time_start)

        await update_show(self.db, show_id, show)
        await self.db.commit()

    async def delete_show(self, show_id: int):
        if not await retrieve_show_short(self.db, show_id):
            raise NoContentException

        if await is_show_busy(self.db, show_id):
            raise ConflictException("You can't delete show with sold tickets")

        await delete_show(self.db, show_id)
        await self.db.commit()
