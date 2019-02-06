#!/usr/bin/env bash

flake8 apps/
ret_code_flake=$?

python manage.py test
ret_code_django_test=$?

yarn test
ret_code_fe_test=$?

yarn flow
ret_code_flow=$?

yarn eslint
ret_code_eslint=$?

if [ $ret_code_flake != 0 ] || [ $ret_code_django_test != 0 ] || [ $ret_code_fe_test != 0 ] || [ $ret_code_flow != 0 ] || [ $ret_code_eslint != 0 ] ; then
  exit 1
fi
