from .staging import *

DEBUG = False
ALLOWED_HOSTS = [
    'holo-apollo.art',
    'www.holo-apollo.art',
    'api.holo-apollo.art',
    'holo-apollo-ui.herokuapp.com',
    'holo-apollo-api.herokuapp.com',
]

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

API_URL = 'https://api.holo-apollo.art'
UI_URL = 'https://www.holo-apollo.art'

# AWS
STATICFILES_LOCATION = 'static'
MEDIAFILES_LOCATION = 'media'

CORS_ORIGIN_WHITELIST = [
    'holo-apollo-ui.herokuapp.com',
    'www.holo-apollo.art',
    'holo-apollo.art',
]

CORS_ORIGIN_REGEX_WHITELIST = []
