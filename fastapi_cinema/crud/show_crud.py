from datetime import datetime

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from utils.crud_utils import accumulated_dict_fetch_all, accumulated_dict_fetch_one, get_update_set_command

SHOWS_DETAILED_SELECT = "select sh.id as id, show_time_start, price,"\
            " p.id as place__id, p.name as place__name, size as place__size,"\
            " f.name as film__name, begin_date as film__begin_date, end_date as film__end_date,"\
            " lasts_minutes as film__lasts_minutes, f.id as film__id "\
            "from shows sh inner join films f on f.id = sh.film_id "\
            "inner join places p on p.id = sh.place_id"

# SHOWS_OVERLAP_SELECT = "select * from shows sh " \
#                        "inner join places p on place_id = p.id " \
#                        "inner join films f on sh.film_id = f.id " \
#                        "where place_id = :place_id and " \
#                        "(show_time_start, show_time_start + make_interval(mins => f.lasts_minutes) ) overlaps " \
#                        "(:show_time_start, :show_time_end)"

SHOWS_OVERLAP_SELECT = "select * from shows sh " \
                       "inner join places p on place_id = p.id " \
                       "inner join films f on sh.film_id = f.id " \
                       "where place_id = :place_id and " \
                       "( (show_time_start <= :show_time_start and :show_time_start <= " \
                       "show_time_start + make_interval(mins => f.lasts_minutes) ) or " \
                       "(show_time_start <= :show_time_end and :show_time_end <= " \
                       "show_time_start + make_interval(mins => f.lasts_minutes)) or ( " \
                       "show_time_start <= :show_time_start and :show_time_end <= " \
                       "show_time_start + make_interval(mins => f.lasts_minutes)))"


async def list_shows(db: AsyncSession):
    res = await db.execute(text(SHOWS_DETAILED_SELECT))
    return accumulated_dict_fetch_all(res.cursor)


async def retrieve_show(db: AsyncSession, show_id: int):
    res = await db.execute(
        text(SHOWS_DETAILED_SELECT + " where sh.id = :show_id limit 1"),
        {"show_id": show_id}
    )
    return accumulated_dict_fetch_one(res.cursor)


async def retrieve_show_short(db: AsyncSession, show_id: int):
    return (await db.execute(
        text("select * from shows where id = :show_id limit 1"),
        {"show_id": show_id}
    )).fetchone()


async def insert_show(db: AsyncSession, show):
    res = await db.execute(
        text(
            "insert into shows (place_id, film_id, show_time_start, price) "
            "values (:place_id, :film_id, :show_time_start, :price) returning *"
        ),
        show.dict(),
    )
    return res.fetchone()


async def get_crossed_place_target(
        db: AsyncSession, place_id: int, show_time_start: datetime, show_time_end: datetime
):
    crossed_shows = (
        await db.execute(
            # text(SHOWS_OVERLAP_SELECT +
            #      f"(timestamptz '{show_time_start.astimezone()}',"
            #      f" timestamptz '{show_time_end.astimezone()}')"),
            text(SHOWS_OVERLAP_SELECT),
            {
                "place_id": place_id,
                "show_time_start": show_time_start,
                "show_time_end": show_time_end,
            },
        )
    ).fetchall()

    return crossed_shows


async def update_show(db: AsyncSession, show_id, show):
    set_command = get_update_set_command(show.dict(exclude_unset=True))
    await db.execute(
        text(f"update shows set {set_command} where id = :show_id"),
        {**show.dict(exclude_unset=True), "show_id": show_id},
    )


async def delete_show(db: AsyncSession, show_id):
    await db.execute("delete from shows where id = :show_id", {"show_id": show_id})


async def is_show_busy(db: AsyncSession, show_id: int):
    busy_shows = await db.execute(
        text("select 1 from orders where show_id = :show_id and status = 'accepted'"),
        {"show_id": show_id}
    )
    return busy_shows.fetchall()
