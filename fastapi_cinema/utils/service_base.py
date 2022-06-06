from sqlalchemy.ext.asyncio import AsyncSession


class BaseService:
    def __init__(self, db: AsyncSession):
        self._db = db

    @property
    def db(self):
        return self._db
