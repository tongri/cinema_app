from pydantic import BaseModel, PositiveInt


class PlaceBase(BaseModel):
    name: str
    size: PositiveInt


class PlaceIn(PlaceBase):
    ...


class PlaceUpdate(PlaceBase):
    name: str | None
    size: PositiveInt | None


class PlaceOut(PlaceBase):
    id: int
