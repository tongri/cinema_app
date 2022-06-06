from pydantic import BaseModel, Field


class User(BaseModel):
    username: str


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
    username: str | None = None
    is_staff: bool = False
    is_restaurateur: bool = False
