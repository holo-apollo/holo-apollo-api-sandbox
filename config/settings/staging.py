from .base import *

SITE_URL = 'https://holo-apollo-staging.herokuapp.com'

# AWS
AWS_STORAGE_BUCKET_NAME = dotenv.get('AWS_STORAGE_BUCKET_NAME', default='holo-apollo-assets')
AWS_S3_REGION_NAME = dotenv.get('AWS_S3_REGION_NAME', default='us-east-2')
AWS_ACCESS_KEY_ID = dotenv.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = dotenv.get('AWS_SECRET_ACCESS_KEY')
AWS_S3_CUSTOM_DOMAIN = 's3.{}.amazonaws.com/{}'.format(AWS_S3_REGION_NAME, AWS_STORAGE_BUCKET_NAME)
STATICFILES_LOCATION = 'static-staging'
STATICFILES_STORAGE = 'config.storages.StaticStorage'
MEDIAFILES_LOCATION = 'media-staging'
DEFAULT_FILE_STORAGE = 'config.storages.MediaStorage'
