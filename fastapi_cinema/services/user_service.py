from crud.user_crud import get_user, create_user, create_access_token, authenticate_user
from schemas.user_schemas import UserIn, UserOut
from utils.exceptions_utils import ObjUniqueException, UnAuthorizedException
from utils.service_base import BaseService


class UserService(BaseService):
    async def create_user(self, user: UserIn):
        if await get_user(self.db, user.username):
            raise ObjUniqueException("User", "username", user.username)
        user_id = await create_user(self.db, user)

        return create_access_token(UserOut(username=user.username, id=user_id).dict())

    async def login_user(self, user: UserIn):
        authenticated_user = await authenticate_user(self.db, user.username, user.password)

        if not authenticated_user:
            raise UnAuthorizedException

        return create_access_token(data=authenticated_user.dict())
