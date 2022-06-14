from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from schemas.products_order_shemas import ProductOrderIn
from utils.crud_utils import prepare_bulk_create_sql, accumulated_dict_fetch_all

PRODUCTS_ORDERS_DETAILED_SELECT = (
    "select po.id as id, po.amount as amount, po.product_id as product_id, p.id as product__id, po.status as status,"
    " p.price as product__price, o.id as order__id, o.amount as order__amount, p.name as product__name,"
    " sh.id as order__show__id, sh.price as order__show__price, sh.show_time_start as "
    "order__show__show_time_start, f.id as order__show__film__id, f.name as order__show__film__name, "
    "f.begin_date as order__show__film__begin_date, f.end_date as order__show__film__end_date, "
    "pl.id as order__show__place__id, pl.name as order__show__place__name, "
    "pl.size as order__show__place__size, f.lasts_minutes as order__show__film__lasts_minutes, o.status as order__status "
    "from products_order po inner join products p on p.id = po.product_id"
    " inner join orders o on o.id = po.order_id inner join shows sh on o.show_id = sh.id"
    " inner join films f on sh.film_id = f.id inner join places pl on pl.id = sh.place_id"
)


async def bulk_create_orders(
    db: AsyncSession, order_id: int, product_orders: list[ProductOrderIn]
) -> None:
    params, args = prepare_bulk_create_sql(
        ["product_id", "order_id", "amount"],
        [{**pr_order.dict(), "order_id": order_id} for pr_order in product_orders],
    )

    await db.execute(
        text(f"insert into products_order (product_id, order_id, amount) values " f"{params}"), args
    )


async def list_products_orders(db: AsyncSession, user_id: int):
    res = await db.execute(
        text(f"{PRODUCTS_ORDERS_DETAILED_SELECT} where o.user_id = :user_id order by sh.show_time_start desc"),
        {"user_id": user_id}
    )

    return accumulated_dict_fetch_all(res.cursor)


async def list_all_products_orders(db: AsyncSession):
    res = await db.execute(
        text(f"{PRODUCTS_ORDERS_DETAILED_SELECT} order by sh.show_time_start desc")
    )

    return accumulated_dict_fetch_all(res.cursor)


async def get_product_order(db: AsyncSession, product_order_id: int):
    return (
        await db.execute(
            text("select * from products_order where id = :id limit 1"),
            {"id": product_order_id},
        )
    ).fetchone()


async def update_product_order_status(
        db: AsyncSession, product_order_id: int, new_status: str
):
    await db.execute(
        text("update products_order set status = :status where id = :id"),
        {"id": product_order_id, "status": new_status}
    )


async def update_product_orders_status_by_order(
        db: AsyncSession, order_id: int, new_status: str
):
    await db.execute(
        text("update products_order set status = :status where order_id = :id"),
        {"id": order_id, "status": new_status}
    )
