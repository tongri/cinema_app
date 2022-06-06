from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_pagination import Page
from schemas.place_schemas import PlaceOut, PlaceIn, PlaceUpdate
from services.place_service import PlaceService
from dependencies import get_admin, async_get_db
from starlette import status

from utils.pagination_utils import PaginationParams, from_response_to_page

router = APIRouter(prefix="/places", tags=["places"])


@router.get("/", response_model=Page[PlaceOut])
async def read_places(
    page: PaginationParams = Depends(PaginationParams), db: AsyncSession = Depends(async_get_db)
):
    return from_response_to_page(page, await PlaceService(db).list_places())


@router.get("/{place_id}/", response_model=PlaceOut)
async def retrieve_place(place_id: int, db: AsyncSession = Depends(async_get_db)):
    return await PlaceService(db).get_place(place_id)


@router.post("/", response_model=PlaceOut)
async def create_place(
    place: PlaceIn, _=Depends(get_admin), db: AsyncSession = Depends(async_get_db)
):
    last_record_id = await PlaceService(db).create_place(place)
    return {**place.dict(), "id": last_record_id}


@router.patch("/{place_id}/", response_model=PlaceOut)
async def patch_place(
    place_id: int,
    place: PlaceUpdate,
    _=Depends(get_admin),
    db: AsyncSession = Depends(async_get_db),
):
    service = PlaceService(db)
    await service.update_place(place_id=place_id, place=place)
    return await service.get_place(place_id)


@router.delete("/{place_id}/", status_code=status.HTTP_200_OK)
async def remove_place(
    place_id: int, _=Depends(get_admin), db: AsyncSession = Depends(async_get_db)
):
    await PlaceService(db).delete_place(place_id)
