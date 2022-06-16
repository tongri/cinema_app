from pydantic import BaseModel, Field, EmailStr


class User(BaseModel):
    email: EmailStr


class UserIn(User):
    password: str


class UserOut(User):
    id: int
    is_staff: bool = Field(default=False)
    is_restaurateur: bool = Field(default=False)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: EmailStr | None = None
    is_staff: bool = False
    is_restaurateur: bool = False


class UserPublic(User):
    id: int
