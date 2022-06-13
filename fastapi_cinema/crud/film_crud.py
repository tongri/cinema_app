from utils.crud_utils import get_update_set_command
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession


async def list_films(db: AsyncSession):
    return (await db.execute(text("select * from films"))).fetchall()


async def get_film_by_id(db: AsyncSession, film_id: int):
    return (
        await db.execute(
            text("select * from films where id = :film_id limit 1"), {"film_id": film_id}
        )
    ).fetchone()


async def insert_film(db: AsyncSession, film):
    res = await db.execute(
        text(
            "insert into films (name, begin_date, end_date, lasts_minutes) "
            "values (:name, :begin_date, :end_date, :lasts_minutes) returning id"
        ),
        film.dict(),
    )
    return res.fetchone()[0]


async def get_film_by_name(db: AsyncSession, film_name):
    return (
        await db.execute(text("select * from films where name = :name"), {"name": film_name})
    ).fetchone()


async def update_film(db: AsyncSession, film_id: int, film):
    set_command = get_update_set_command(film.dict(exclude_unset=True))
    await db.execute(
        text(f"update films set {set_command} where id = :film_id"),
        {**film.dict(exclude_unset=True), "film_id": film_id},
    )


async def is_legal_target_validate(db: AsyncSession, film_id, begin_date=None, end_date=None):

    if not begin_date and not end_date:
        return True

    sql_args = {"id": film_id}
    conditions = []

    if begin_date:
        conditions.append("show_time_start < :begin_date")
        sql_args["begin_date"] = begin_date

    if end_date:
        conditions.append("show_time_start < :begin_date")
        sql_args["begin_date"] = begin_date

    sql_comm_cond = " and ".join(conditions)

    shows_overlapped = (
        await db.execute(
            text(f"select count(*) from shows where film_id = :id and {sql_comm_cond}"), sql_args
        )
    ).fetchone()

    return not shows_overlapped.count


async def is_film_busy(db: AsyncSession, film_id):
    show_with_busy_place = (
        await db.execute(
            text("select count(*) from shows join orders o on o.show_id = shows.id where shows.film_id = :id"),
            {"id": film_id},
        )
    ).fetchone()

    return show_with_busy_place.count


async def delete_film(db: AsyncSession, film_id):
    await db.execute(text("delete from films where id = :film_id"), {"film_id": film_id})
