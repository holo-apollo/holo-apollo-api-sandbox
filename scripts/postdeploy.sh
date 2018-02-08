#!/usr/bin/env bash

pg_dump $STAGING_DATABASE_URL | psql $DATABASE_URL
python manage.py migrate --noinput
