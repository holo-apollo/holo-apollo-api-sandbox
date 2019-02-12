from .base import *

STATICFILES_LOCATION = 'static-review'
MEDIAFILES_LOCATION = 'media-review'

CORS_ORIGIN_WHITELIST = [
    # TODO: use patterns to allow all local and UI review apps
    'localhost:8000',
    '127.0.0.1:8000',
    'localhost:3000',
    '127.0.0.1:3000',
    'holo-apollo-ui-test.herokuapp.com',
]

CSRF_TRUSTED_ORIGINS = CORS_ORIGIN_WHITELIST
