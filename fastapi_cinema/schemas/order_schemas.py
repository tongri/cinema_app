from pydantic import BaseModel, PositiveInt
from schemas.show_schemas import ShowOut
from datetime import datetime


class OrderBase(BaseModel):
    amount: PositiveInt


class OrderIn(OrderBase):
    ...


class OrderOut(OrderBase):
    id: int
    amount: int
    show: ShowOut
    status: str


class OrderByShow(BaseModel):
    total: int
    film_name: str
    show_time_start: datetime
