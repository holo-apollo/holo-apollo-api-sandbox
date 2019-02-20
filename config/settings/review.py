from .base import *

STATICFILES_LOCATION = 'static-review'
MEDIAFILES_LOCATION = 'media-review'

CORS_ORIGIN_REGEX_WHITELIST = [
    # localhost
    r'^(http://)?(localhost|127\.0\.0\.1)(:\d+)?$',

    # test or review heroku app
    r'^(https?://)?(\w+\.)?holo-apollo-ui-test(-pr-\d+)?\.herokuapp\.com$',
]
