#!/usr/bin/env bash

python manage.py collectstatic

python manage.py test
ret_code_django=$?

npm test
ret_code_npm=$?

if [ $ret_code_django != 0 ] || [ $ret_code_npm != 0 ] ; then
  exit 1
fi
