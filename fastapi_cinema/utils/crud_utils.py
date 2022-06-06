from collections import namedtuple, defaultdict
import datetime


a = {
    "id": 3,
    "amount": 5,
    "show__price": 100,
    "show__busy": 20,
    "show__id": 32,
    "show__place__name": "red",
    "show__place__size": 201,
    "show__place__id": 1,
    "show__film__id": 2,
    "show__film__name": "randoe",
    "show__film__begin_date": datetime.date(2022, 5, 25),
    "show__film__end_date": datetime.date(2022, 5, 30),
    "show__film__lasts_minutes": 100,
}


def dict_fetch_all(cursor) -> list:
    """Return all rows from a cursor as a dict"""
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]


def accumulated_dict_fetch_all(cursor) -> list[dict]:
    columns = [col[0] for col in cursor.description]
    return [flat_to_object_dict(dict(zip(columns, row))) for row in cursor.fetchall()]


def accumulated_dict_fetch_one(cursor) -> dict:
    if not (fetched := cursor.fetchone()):
        return {}
    columns = [col[0] for col in cursor.description]
    return flat_to_object_dict(dict(zip(columns, fetched)))


def named_tuple_fetchall(cursor) -> list:
    """Return all rows from a cursor as a namedtuple"""
    desc = cursor.description
    nt_result = namedtuple("Result", [col[0] for col in desc])
    return [nt_result(*row) for row in cursor.fetchall()]


def get_update_set_command(data_dict: dict) -> str:
    params = [" = ".join([k, f":{k}"]) for k in data_dict]
    return ", ".join(params)


def flat_to_object_dict(income_dict: dict) -> dict:
    res_dict = {}
    for k, v in income_dict.items():
        namings = k.split("__")
        res_dict = from_keys_list_to_dict(namings, v, res_dict)

    return res_dict


def from_keys_list_to_dict(keys_list: list, value, res_dict: dict):
    if keys_list:
        inner_key = keys_list.pop(0)
        return {
            **res_dict,
            inner_key: from_keys_list_to_dict(keys_list, value, res_dict.get(inner_key, {})),
        }
    return value
