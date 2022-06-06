FROM python:3.10

WORKDIR /var/www/server

COPY ./requirements.txt /var/www/server/requirements.txt

RUN pip install --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /var/www/server/requirements.txt


COPY . /var/www/server
