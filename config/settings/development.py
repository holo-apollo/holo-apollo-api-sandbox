from .base import *

API_URL = 'https://holo-apollo-api-test.herokuapp.com'
UI_URL = 'https://holo-apollo-ui-test.herokuapp.com'

STATICFILES_LOCATION = 'static'
MEDIAFILES_LOCATION = 'media-development'

CORS_ORIGIN_WHITELIST = [
    # TODO: use patterns to allow all local and UI review apps
    'localhost:8000',
    '127.0.0.1:8000',
    'localhost:3000',
    '127.0.0.1:3000',
    'holo-apollo-ui-test.herokuapp.com',
]

CSRF_TRUSTED_ORIGINS = CORS_ORIGIN_WHITELIST
