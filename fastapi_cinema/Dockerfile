FROM python:3.10
ENV PYTHONUNBUFFERED=1
WORKDIR /var/www/server

COPY ./requirements.txt /var/www/server/requirements.txt

RUN pip install --upgrade pip
RUN pip install virtualenv
RUN virtualenv venv
RUN . venv/bin/activate
RUN pip install --no-cache-dir --upgrade -r /var/www/server/requirements.txt
RUN pip install aioredis
RUN pip install "pydantic[email]"


COPY . /var/www/server
