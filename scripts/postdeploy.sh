#!/usr/bin/env bash

psql $DATABASE_URL -f copy_dump.sql
pg_dump $STAGING_DATABASE_URL | psql $DATABASE_URL
python manage.py migrate --noinput
