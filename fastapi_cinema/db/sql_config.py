from enum import Enum


class FieldTypes(Enum):
    serial = "serial"
    varchar = lambda length: f"varchar({length})"
    boolean = "boolean"
    date = "date"
    smallint = "smallint"
    integer = "integer"
    date_time = "timestamp"


class Constraints(Enum):
    pk = "primary key"
    unique = "unique"
    not_null = "not null"
    unique_not_null = "unique not null"
    check = lambda expr: f"check ({expr})"
    foreign_key = lambda key, parent_table, parent_attr, on_delete: f"foreign key({key}) references {parent_table}" \
                                                                    f"({parent_attr}) on delete {on_delete}"


user_table_name = "MyUsers"
film_table_name = "Films"
place_table_name = "Places"
show_table_name = "Shows"
order_table_name = "Orders"
product_table_name = "Products"
product_order_table_name = "Products_Order"


user_table = {
        "name": user_table_name,
        "columns": [
            {
                "name": "id",
                "type": FieldTypes.serial.value,
                "constraints": Constraints.pk.value,
            },
            {
                "name": "password",
                "type": FieldTypes.varchar(256),
                "constraints": Constraints.not_null.value,
            },
            {
                "name": "is_staff",
                "type": FieldTypes.boolean.value,
                "constraints": Constraints.not_null.value,
                "default": "default false"
            },
            {
                "name": "is_restaurateur",
                "type": FieldTypes.boolean.value,
                "constraints": Constraints.not_null.value,
                "default": "default false"
            },
            {
                "name": "username",
                "type": FieldTypes.varchar(50),
                "constraints": Constraints.check("char_length(username) >= 4") + " " + Constraints.unique_not_null.value,
            },
        ]
    }

film_table = {
        "name": film_table_name,
        "columns": [
            {
                "name": "id",
                "type": FieldTypes.serial.value,
                "constraints": Constraints.pk.value,
            },
            {
                "name": "name",
                "type": FieldTypes.varchar(128),
                "constraints": Constraints.check("char_length(name) >= 3") + " " + Constraints.unique_not_null.value,
            },
            {
                "name": "begin_date",
                "type": FieldTypes.date.value,
                "constraints": Constraints.not_null.value,
            },
            {
                "name": "end_date",
                "type": FieldTypes.date.value,
                "constraints": Constraints.not_null.value,
            },
            {
                "name": "lasts_minutes",
                "type": FieldTypes.smallint.value,
                "constraints": Constraints.check("lasts_minutes > 0") + Constraints.not_null.value,
            },
        ]
    }

place_table = {
        "name": place_table_name,
        "columns": [
            {
                "name": "id",
                "type": FieldTypes.serial.value,
                "constraints": Constraints.pk.value,
            },
            {
                "name": "name",
                "type": FieldTypes.varchar(128),
                "constraints": Constraints.check("char_length(name) >= 3") + " " + Constraints.unique_not_null.value,
            },
            {
                "name": "size",
                "type": "smallint",
                "constraints": Constraints.check("size > 0"),
            },
        ]
    }

show_table = {
        "name": show_table_name,
        "columns": [
            {
                "name": "id",
                "type": FieldTypes.serial.value,
                "constraints": Constraints.pk.value,
            },
            {
                "name": "place_id",
                "type": FieldTypes.integer.value,
            },
            {
                "name": "film_id",
                "type": FieldTypes.integer.value,
            },
            {
                "name": "show_time_start",
                "type": FieldTypes.date_time.value,
            },
            {
                "name": "price",
                "type": FieldTypes.smallint.value,
                "constraints": Constraints.check("price >= 0")
            },
            {
                "name": Constraints.foreign_key("place_id", place_table_name, "id", "cascade")
            },
            {
                "name": Constraints.foreign_key("film_id", film_table_name, "id", "cascade")
            },
        ],
    }

order_table = {
        "name": order_table_name,
        "columns": [
            {
                "name": "id",
                "type": FieldTypes.serial.value,
                "constraints": Constraints.pk.value,
            },
            {
                "name": "user_id",
                "type": FieldTypes.integer.value,
            },
            {
                "name": "show_id",
                "type": FieldTypes.integer.value,
            },
            {
                "name": "amount",
                "type": FieldTypes.smallint.value,
                "constraints": Constraints.check("amount >= 0")
            },
            {
                "name": Constraints.foreign_key("user_id", user_table_name, "id", "cascade")
            },
            {
                "name": Constraints.foreign_key("show_id", show_table_name, "id", "set null")
            }
        ],
    }

product_table = {
        "name": product_table_name,
        "columns": [
            {
                "name": "id",
                "type": FieldTypes.serial.value,
                "constraints": Constraints.pk.value,
            },
            {
                "name": "name",
                "type": FieldTypes.varchar(128),
                "constraints": Constraints.check("char_length(name) >= 3") + " " + Constraints.unique_not_null.value,
            },
            {
                "name": "price",
                "type": FieldTypes.smallint,
                "constraints": Constraints.check("price > 0")
            }
        ],
    }

product_order_table = {
        "name": product_order_table_name,
        "columns": [
            {
                "name": "id",
                "type": FieldTypes.serial.value,
                "constraints": Constraints.pk.value,
            },
            {
                "name": "product_id",
                "type": FieldTypes.integer.value,
            },
            {
                "name": "order_id",
                "type": FieldTypes.integer.value,
            },
            {
                "name": "amount",
                "type": FieldTypes.smallint.value,
                "constraints": Constraints.check("amount >= 0")
            },
            {
                "name": "status",
                "type": FieldTypes.varchar(30),
                "constraints": Constraints.not_null.value,
                "default": "default 'pending'"
            },
            {
                "name": Constraints.foreign_key("product_id", product_table_name, "id", "set null")
            },
            {
                "name": Constraints.foreign_key("order_id", order_table_name, "id", "cascade")
            }
        ],
    }


all_tables = [
    user_table, film_table, place_table, show_table, order_table, product_table, product_order_table
]
