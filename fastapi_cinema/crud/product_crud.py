from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from utils.crud_utils import get_update_set_command


async def list_products(db: AsyncSession):
    return (await db.execute(text("select * from products"))).fetchall()


async def get_product_by_id(db: AsyncSession, product_id: int):
    return (
        await db.execute(
            text("select * from products where id = :product_id limit 1"),
            {"product_id": product_id}
        )
    ).fetchone()


async def insert_product(db: AsyncSession, product):
    res = await db.execute(
        text(
            "insert into products (name, price) values (:name, :price) returning id"
        ),
        product.dict(),
    )
    await db.commit()
    return res.fetchone()[0]


async def update_product(db: AsyncSession, product_id: int, product):
    set_command = get_update_set_command(product.dict(exclude_unset=True))
    await db.execute(
        text(f"update products set {set_command} where id = :product_id"),
        {"product_id": product_id, **product.dict(exclude_unset=True)}
    )
    await db.commit()


async def delete_product(db: AsyncSession, product_id: int):
    await db.execute(text("delete from products where id = :product_id"), {"product_id": product_id})
    await db.commit()


async def get_product_by_name(db: AsyncSession, product_name):
    return (
        await db.execute(text("select * from products where name = :name"), {"name": product_name})
    ).fetchone()


async def is_product_busy(db: AsyncSession, product_id: int):
    bought_products = (
        await db.execute(
            text("select count(*) from products_order where product_id = :id limit 1 "),
            {"id": product_id}
        )
    ).fetchone()
    return bought_products.count
