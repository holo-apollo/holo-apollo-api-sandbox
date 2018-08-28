#!/usr/bin/env bash

npm run build-dev
python manage.py collectstatic --noinput
