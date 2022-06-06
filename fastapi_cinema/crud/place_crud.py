from datetime import datetime

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from utils.crud_utils import get_update_set_command


async def list_places(db: AsyncSession):
    return (await db.execute(text("SELECT id, name, size from places"))).fetchall()


async def get_place_by_id(db: AsyncSession, place_id: int):
    return (
        await db.execute(
            "select * from places where id = :place_id limit 1", {"place_id": place_id}
        )
    ).fetchone()


async def get_place_by_name(db: AsyncSession, place_name):
    return (
        await db.execute(text("select * from places where name = :name"), {"name": place_name})
    ).fetchone()


async def insert_place(db: AsyncSession, place):

    res = await db.execute(
        text("insert into places (name, size) values (:name, :size) returning id"), place.dict()
    )
    await db.commit()
    return res.fetchone()[0]


async def update_place(db: AsyncSession, place_id, place):
    set_command = get_update_set_command(place.dict(exclude_unset=True))
    await db.execute(
        text(f"update places set {set_command} where id = :place_id"),
        {**place.dict(exclude_unset=True), "place_id": place_id},
    )
    await db.commit()


async def is_place_busy(db: AsyncSession, place_id: int):
    """Check that place doesn't have future shows with sold tickets"""

    show_with_busy_place = (
        await db.execute(
            text(
                "select count(*) from shows join orders o on o.show_id = shows.id where shows.place_id = :id"
            ),
            {"place_id": place_id, "start_time": datetime.now()},
        )
    ).fetchone()

    return show_with_busy_place.count


async def delete_place(db: AsyncSession, place_id):
    await db.execute("delete from places where id = :place_id", {"place_id": place_id})
    await db.commit()
