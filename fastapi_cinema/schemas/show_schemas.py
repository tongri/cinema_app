from datetime import datetime

from pydantic import BaseModel, PositiveInt, validator

from schemas.film_schemas import FilmOut
from schemas.place_schemas import PlaceOut


class ShowBase(BaseModel):
    show_time_start: datetime
    price: int


class ShowInDb(ShowBase):
    id: int
    place_id: int
    film_id: int


class ShowIn(ShowBase):
    place_id: int
    film_id: int

    @validator("show_time_start")
    def validate_show_time_start_future(cls, v):
        if not v.astimezone() > datetime.now().astimezone():
            raise ValueError("Show can't be held in past")
        return v


class ShowUpdate(ShowIn):
    show_time_start: datetime | None
    price: PositiveInt | None
    place_id: int | None
    film_id: int | None

    @validator("show_time_start")
    def validate_show_time_start_future(cls, v):
        return super().validate_show_time_start_future(v) if v else v


class ShowOut(ShowBase):
    id: int
    place: PlaceOut
    film: FilmOut
