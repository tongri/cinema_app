import json

from aioredis import Redis
from fastapi import Depends, APIRouter, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession

from background_tasks import produce_data
from dependencies import get_current_user, async_get_db, init_redis_pool
from services.user_service import UserService
from schemas.user_schemas import UserIn, UserOut, Token

router = APIRouter(tags=["user"])


@router.post("/reg/", response_model=Token)
async def register_user(
    user: UserIn,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(async_get_db),
    redis: Redis = Depends(init_redis_pool)
):
    background_tasks.add_task(
        produce_data,
        broker=redis,
        topic="auth_topic",
        message=json.dumps({"email": user.email, "description": "successfully signed up"})
    )
    await redis.publish("auth_topic", json.dumps({"email": user.email, "description": "successfully signed up"}))
    access_token = await UserService(db).create_user(user)
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/auth/", response_model=Token)
async def login_user(user: UserIn, db: AsyncSession = Depends(async_get_db)):
    access_token = await UserService(db).login_user(user)
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me/", response_model=UserOut)
async def get_me(current_user: UserOut = Depends(get_current_user)):
    return current_user
