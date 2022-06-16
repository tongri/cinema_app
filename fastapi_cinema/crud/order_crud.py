from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from utils.crud_utils import accumulated_dict_fetch_all
from schemas.order_schemas import OrderIn

ORDERS_DETAILED_SELECT = (
    "select o.id as id, amount, price as show__price, status,"
    " s.id as show__id, p.name as show__place__name, p.size as show__place__size,"
    " p.id as show__place__id, f.id as show__film__id, f.name as show__film__name, "
    " f.begin_date as show__film__begin_date, f.end_date as show__film__end_date,"
    " f.lasts_minutes as show__film__lasts_minutes, s.show_time_start as show__show_time_start"
    " from orders o inner join shows s on o.show_id = s.id"
    " inner join films f on f.id = s.film_id"
    " inner join places p on s.place_id = p.id"
)


ORDERS_DETAILED_SELECT_ADMIN = (
    "select o.id as id, amount, price as show__price, status,"
    " s.id as show__id, p.name as show__place__name, p.size as show__place__size,"
    " p.id as show__place__id, f.id as show__film__id, f.name as show__film__name, "
    " f.begin_date as show__film__begin_date, f.end_date as show__film__end_date,"
    " f.lasts_minutes as show__film__lasts_minutes, s.show_time_start as show__show_time_start,"
    " u.id as user__id, u.email as user__email"
    " from orders o inner join shows s on o.show_id = s.id"
    " inner join films f on f.id = s.film_id"
    " inner join places p on s.place_id = p.id inner join myusers u on o.user_id = u.id"
)


ORDERS_BY_SHOW = (
    "select total, films.name film_name, show_time_start from (select sum(amount) as total, sh.id, sh.show_time_start, "
    " sh.film_id from shows sh join orders o on o.show_id = sh.id join films f on f.id = sh.film_id "
    "where o.status = 'accepted' group by sh.id) "
    " shows_orders inner join films on films.id = shows_orders.film_id"
)


async def create_order(db: AsyncSession, user_id: int, show_id: int, order: OrderIn):
    res = await db.execute(
        text(
            "insert into orders (user_id, show_id, amount) values (:user_id, :show_id, :amount) returning id"
        ),
        {"user_id": user_id, "show_id": show_id, "amount": order.amount},
    )
    return res.fetchone()[0]


async def list_orders(db: AsyncSession, user_id: int):
    res = await db.execute(
        text(f"{ORDERS_DETAILED_SELECT} where user_id = :user_id"), {"user_id": user_id}
    )
    return accumulated_dict_fetch_all(res.cursor)


async def list_orders_admin(db: AsyncSession):
    res = await db.execute(
        text(ORDERS_DETAILED_SELECT_ADMIN)
    )
    return accumulated_dict_fetch_all(res.cursor)


async def get_order(db: AsyncSession, order_id: int):
    return (
        await db.execute(
            text("select * from orders where id = :id limit 1"),
            {"id": order_id}
        )
    ).fetchone()


async def get_orders_amount_by_show(db: AsyncSession, show_id: int):
    res = await db.execute(
        text("select count(*) from orders where show_id = :show_id and status = 'accepted'"),
        {"show_id": show_id}
    )
    return res.fetchone()


async def list_orders_by_films(db: AsyncSession):
    return (await db.execute(text(f"{ORDERS_BY_SHOW}"))).fetchall()


async def update_order_status(
        db: AsyncSession, order_id: int, new_status: str
):
    await db.execute(
        text("update orders set status = :status where id = :id"),
        {"id": order_id, "status": new_status}
    )


async def get_show_by_order_id(db: AsyncSession, order_id: int):
    res = await db.execute(
        text(
            "select sh.show_time_start show_time_start, sh.place_id place_id, sh.film_id film_id, sh.id id"
            " from order o inner join shows sh on o.show_id = sh.id where o.id = :order_id limit 1"
        ),
        {"order_id": order_id}
    )
    return res.fetchone()
