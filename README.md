# Cinema application


## Local setup

Make sure you have installed docker on your local machine

Create env file for docker `touch env`

Insert data to `env` file by the following template

```
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<db>
POSTGRES_USER=<user>
host=mydb
port=5432
secret_key=<random secret key>
algorithm=<alg>
access_token_expire_minutes=<any time in minutes>
```
