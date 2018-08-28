#!/usr/bin/env bash

python manage.py migrate --noinput
npm run build-dev
npm run build
python manage.py collectstatic --noinput
