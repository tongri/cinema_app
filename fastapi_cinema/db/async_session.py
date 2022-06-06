from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from db.database import ASYNC_DATABASE_URL
from sqlalchemy.orm import sessionmaker


engine_async = create_async_engine(ASYNC_DATABASE_URL)
async_session = sessionmaker(
    bind=engine_async,
    class_=AsyncSession,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)
