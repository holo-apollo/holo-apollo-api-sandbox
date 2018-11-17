#!/usr/bin/env bash

flake8 apps/
ret_code_flake=$?

python manage.py test
ret_code_django=$?

npm test
ret_code_npm=$?

npm run flow
ret_code_flow=$?

npm run eslint
ret_code_eslint=$?

if [ $ret_code_flake != 0 ] || [ $ret_code_django != 0 ] || [ $ret_code_npm != 0 ] || [ $ret_code_flow != 0 ] || [ $ret_code_eslint != 0 ] ; then
  exit 1
fi
