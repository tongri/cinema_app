from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination

from routers import places, user, shows, films, orders, products
from utils.exceptions_utils import AppException, app_exception_handler


origins = [
    "http://localhost:3000",
]


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(places.router, prefix="/api")
app.include_router(films.router, prefix="/api")
app.include_router(user.router, prefix="/api")
app.include_router(shows.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(products.router, prefix="/api")


@app.exception_handler(AppException)
async def custom_app_exception_handler(request: Request, exception: AppException):
    return await app_exception_handler(exception)


add_pagination(app)
