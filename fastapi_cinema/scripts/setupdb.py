from db.session import local_session
from db.sql_config import all_tables


def prepare_sql(table_dict: dict) -> str:
    name = table_dict.pop("name")
    columns = table_dict.pop("columns")
    columns_command_list = [
        f"{column.pop('name')} {column.get('type', '')} {column.get('constraints', '')} {column.get('default', '')}"
        for column in columns
    ]
    columns_command = ", ".join(columns_command_list)
    return f"create table if not exists {name} ({columns_command});"


def create_tables():
    with local_session() as session:
        for table in all_tables:
            print(f"Configuring table {table['name']}")
            command = prepare_sql(table)
            session.execute(command)
        session.commit()


if __name__ == "__main__":
    create_tables()
