from decouple import config
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status
from db.async_session import async_session
from crud.user_crud import get_user
from schemas.user_schemas import TokenData, UserOut
from aioredis import from_url, Redis

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def async_get_db():
    async with async_session() as session:
        yield session


async def get_current_user(db: AsyncSession = Depends(async_get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, config("secret_key"), algorithms=[config("algorithm")])

        if payload is None:
            raise credentials_exception

        token_data = TokenData(**payload)
    except JWTError as e:
        raise credentials_exception from e

    user = await get_user(db, email=token_data.email)

    if user is None:
        raise credentials_exception

    return UserOut(**user)


async def get_admin(user: UserOut = Depends(get_current_user)):
    if not user.is_staff:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    return user


async def get_restaurateur(user: UserOut = Depends(get_current_user)):
    if not user.is_restaurateur:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    return user


async def init_redis_pool() -> Redis:
    pool = from_url(f"redis://{config('REDIS_HOST')}", decode_responses=True)
    async with pool.client() as conn:
        yield conn
