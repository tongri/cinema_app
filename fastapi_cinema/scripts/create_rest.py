from db.session import local_session
from crud.user_crud import get_hashed_password
from db.sql_config import user_table_name
import argparse


def create_rest(args):
    with local_session() as session:
        pwd = get_hashed_password(args.p)
        session.execute(
            f"insert into {user_table_name} (username, password, is_restaurateur)"
            f" values ('{args.u}', '{pwd}', true);"
        )
        session.commit()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="create admin")
    parser.add_argument("-u", type=str, help="username for restaurateur")
    parser.add_argument("-p", type=str, help="password for restaurateur")
    args = parser.parse_args()
    create_rest(args)
