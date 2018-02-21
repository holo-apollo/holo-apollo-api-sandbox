#!/usr/bin/env bash

python manage.py collectstatic
python manage.py test
npm --prefix frontend/ test
