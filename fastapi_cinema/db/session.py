from sqlalchemy import create_engine
from db.database import DATABASE_URL
from sqlalchemy.orm import sessionmaker


engine = create_engine(DATABASE_URL)
local_session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
