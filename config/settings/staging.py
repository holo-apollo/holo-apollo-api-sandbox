from .base import *

SITE_URL = 'https://holo-apollo-staging.herokuapp.com'

if dotenv.get('USE_AWS_STATIC'):
    STATICFILES_STORAGE = 'config.storages.StaticStorage'

STATICFILES_LOCATION = 'static-staging'
MEDIAFILES_LOCATION = 'media-staging'
