from datetime import date

from pydantic import BaseModel, validator, root_validator


class FilmRequiredBase(BaseModel):
    name: str
    begin_date: date
    end_date: date
    lasts_minutes: int


class FilmIn(FilmRequiredBase):
    @root_validator
    def validate_dates(cls, values):
        begin_date = values.get("begin_date")
        end_date = values.get("end_date")
        if begin_date and end_date and begin_date > end_date:
            raise ValueError("Film's begin of shows must be before its end")
        return values

    @validator("begin_date")
    def validate_begin_date(cls, v):
        if date.today() > v:
            raise ValueError("Film's begin_date can't be set in the past")
        return v

    @validator("end_date")
    def validate_end_date(cls, v):
        if date.today() > v:
            raise ValueError("Film's end_date can't be set in the past")
        return v


class FilmUpdate(FilmIn):
    name: str | None
    begin_date: date | None
    end_date: date | None
    lasts_minutes: int | None

    @validator("begin_date")
    def validate_begin_date(cls, v):
        return v

    @validator("end_date")
    def validate_end_date(cls, v):
        return v


class FilmOut(FilmRequiredBase):
    id: int
