from db.session import local_session
from db.sql_config import all_tables


def prepare_sql(table_dict: dict) -> str:
    return f"drop table if exists {table_dict['name']};"


def drop_tables():
    with local_session() as session:
        for table in reversed(all_tables):
            print(f"Deleting table {table['name']}")
            command = prepare_sql(table)
            session.execute(command)
        session.commit()


if __name__ == "__main__":
    drop_tables()
