from pydantic import BaseModel, PositiveInt


class ProductBase(BaseModel):
    name: str
    price: PositiveInt


class ProductIn(ProductBase):
    ...


class ProductOut(ProductBase):
    id: int


class ProductUpdate(ProductBase):
    name: str | None
    price: PositiveInt | None
