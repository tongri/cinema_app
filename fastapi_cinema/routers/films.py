from fastapi import APIRouter, Depends
from fastapi_pagination import Page
from starlette import status
from dependencies import get_admin, async_get_db
from services.film_service import FilmService
from schemas.film_schemas import FilmOut, FilmIn, FilmUpdate
from sqlalchemy.ext.asyncio import AsyncSession

from utils.pagination_utils import PaginationParams, from_response_to_page

router = APIRouter(prefix="/films", tags=["films"])


@router.get("/", response_model=Page[FilmOut])
async def read_films(
    page: PaginationParams = Depends(PaginationParams), db: AsyncSession = Depends(async_get_db)
):
    return from_response_to_page(page, await FilmService(db).list_films())


@router.get("/{film_id}/", response_model=FilmOut)
async def retrieve_film(film_id: int, db: AsyncSession = Depends(async_get_db)):
    return FilmService(db).get_film(film_id)


@router.post("/", response_model=FilmOut)
async def create_film(film: FilmIn, _=Depends(get_admin), db: AsyncSession = Depends(async_get_db)):
    last_record_id = await FilmService(db).create_film(film)
    return {**film.dict(), "id": last_record_id}


@router.patch("/{film_id}/", response_model=FilmOut)
async def patch_film(
    film_id: int, film: FilmUpdate, _=Depends(get_admin), db: AsyncSession = Depends(async_get_db)
):
    await FilmService(db).update_film(film_id=film_id, film=film)
    return await FilmService(db).get_film(film_id)


@router.delete("/{film_id}/", status_code=status.HTTP_200_OK)
async def remove_film(film_id: int, _=Depends(get_admin), db: AsyncSession = Depends(async_get_db)):
    await FilmService(db).delete_film(film_id)
