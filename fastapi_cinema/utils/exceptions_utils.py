from starlette import status
from starlette.responses import JSONResponse


class AppException(Exception):
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message

    def __str__(self) -> str:
        return self.message


async def app_exception_handler(exc: AppException):
    return JSONResponse(status_code=exc.status_code, content={"error": {"message": str(exc)}})


class ObjNotFoundException(AppException):
    def __init__(self, obj_name: str, param: str, value):
        message = f"{obj_name} with {param} {value} not found"
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, message=message)


class ObjUniqueException(AppException):
    def __init__(self, obj_name: str, param: str, value):
        message = f"{obj_name} with {param} {value} already exists"
        super().__init__(status_code=status.HTTP_409_CONFLICT, message=message)


class ConflictException(AppException):
    def __init__(self, message):
        super().__init__(status_code=status.HTTP_409_CONFLICT, message=message)


class NoContentException(AppException):
    def __init__(self):
        super().__init__(status_code=status.HTTP_204_NO_CONTENT, message="No content")


class UnAuthorizedException(AppException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED, message="Incorrect username or password"
        )
