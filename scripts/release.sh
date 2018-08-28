#!/usr/bin/env bash

python manage.py migrate --noinput
npm run build-dev
python manage.py collectstatic --noinput
