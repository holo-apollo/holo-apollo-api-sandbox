from .base import *

SITE_URL = 'https://holo-apollo-api-staging.herokuapp.com'

STATICFILES_LOCATION = 'static'
MEDIAFILES_LOCATION = 'media-staging'

CORS_ORIGIN_WHITELIST = [
    'holo-apollo-ui-staging.herokuapp.com',
]

CSRF_TRUSTED_ORIGINS = CORS_ORIGIN_WHITELIST
