#!/usr/bin/env bash

flake8 apps/
ret_code_flake=$?

python manage.py test
ret_code_django=$?

npm test
ret_code_npm=$?

if [ $ret_code_flake != 0 ] || [ $ret_code_django != 0 ] || [ $ret_code_npm != 0 ] ; then
  exit 1
fi
