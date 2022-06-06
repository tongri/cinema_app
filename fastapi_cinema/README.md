# Backend Cinema


## Local Setup


**Install requirements**
Make sure to use python 3.10 version

Install virtualenv `pip install virtualenv`

Create one and activate `virtualenv venv & source venv/bin/activate`

Install requirements `pip install -r requirements.txt`

---
**Prepare env variables**

Create `.env` file from the following template

```
db_name=<db_name>
db_user=<db_user>
password=<db_password>
host=localhost
port=<port>
secret_key=<secret_key>
algorithm=<algorithm>
access_token_expire_minutes=
```

Ensure that your db is running locally and accessible with creds above

---
**Setup db**

Run the following command to create tables in db

`python scripts/setupdb.py`

In case you need drop them - run the following one

`python scripts/dropdb.py`

In order to create superuser run the following

`python scripts/create_admin.py -u <username> -p <password>`

----
**Run application**

just run the following

`uvicorn main:app --reload`
