from .base import *

API_URL = 'https://holo-apollo-api-test.herokuapp.com'
UI_URL = 'https://holo-apollo-ui-test.herokuapp.com'

STATICFILES_LOCATION = 'static'
MEDIAFILES_LOCATION = 'media-development'

CORS_ORIGIN_REGEX_WHITELIST = [
    # localhost
    r'^(http://)?(localhost|127\.0\.0\.1)(:\d+)?$',

    # test or review heroku app
    r'^(https?://)?(\w+\.)?holo-apollo-ui-test(-pr-\d+)?\.herokuapp\.com$',
]
