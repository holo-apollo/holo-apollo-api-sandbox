from .base import *

DEBUG = False
PRODUCTION = True
ALLOWED_HOSTS = [
    'holo-apollo.art',
    'www.holo-apollo.art',
    'holo-apollo.herokuapp.com',
    'www.holo-apollo.herokuapp.com',
]

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

SITE_URL = 'https://www.holo-apollo.art'
