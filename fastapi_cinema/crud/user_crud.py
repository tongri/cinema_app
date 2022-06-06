from datetime import datetime, timedelta
from decouple import config
from jose import jwt
from passlib.hash import pbkdf2_sha256
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from schemas.user_schemas import UserOut, UserIn


def get_hashed_password(plain_text_password):
    # Hash a password for the first time
    #   (Using bcrypt, the salt is saved into the hash itself)
    return pbkdf2_sha256.hash(plain_text_password)


def check_password(plain_text_password, hashed_password):
    # Check hashed password. Using bcrypt, the salt is saved into the hash itself
    return pbkdf2_sha256.verify(plain_text_password, hashed_password)


async def get_user(db: AsyncSession, username: str):
    return (
        await db.execute(
            text("select * from myusers where username = :username limit 1"), {"username": username}
        )
    ).fetchone()


async def create_user(db: AsyncSession, user: UserIn):
    user.password = get_hashed_password(user.password)
    res = await db.execute(
        "insert into myusers (username, password) values (:username, :password) returning id", user.dict()
    )
    await db.commit()
    return res.fetchone()[0]


def create_access_token(data: dict,) -> str:
    to_encode = data.copy()
    to_encode["exp"] = datetime.utcnow() + timedelta(minutes=200)
    return jwt.encode(to_encode, config("secret_key"), algorithm=config("algorithm"))


async def authenticate_user(db: AsyncSession, username: str, password: str) -> UserOut | None:
    user = await get_user(db, username)
    if not user:
        return
    if not check_password(password, user.password):
        return
    return UserOut(**user)
