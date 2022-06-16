from db.session import local_session
from crud.user_crud import get_hashed_password
from db.sql_config import user_table_name
import argparse


def create_admin(args):
    with local_session() as session:
        pwd = get_hashed_password(args.p)
        session.execute(
            f"insert into {user_table_name} (email, password, is_staff)"
            f" values ('{args.e}','{pwd}', true);"
        )
        session.commit()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="create admin")
    parser.add_argument("-p", type=str, help="password for admin")
    parser.add_argument("-e", type=str, help="email for admin")
    args = parser.parse_args()
    create_admin(args)
