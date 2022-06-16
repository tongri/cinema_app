from pydantic import BaseModel, PositiveInt

from schemas.order_schemas import OrderOut, OrderOutAdmin
from schemas.product_schemas import ProductOut


class BaseProductOrder(BaseModel):
    product_id: int
    amount: PositiveInt


class ProductOrderOut(BaseProductOrder):
    id: int
    order: OrderOut
    product: ProductOut
    status: str


class ProductOrderOutAdmin(BaseProductOrder):
    id: int
    order: OrderOutAdmin
    product: ProductOut
    status: str


class ProductOrderIn(BaseProductOrder):
    ...
