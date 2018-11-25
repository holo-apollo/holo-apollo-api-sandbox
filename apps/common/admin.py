from django.conf import settings
from django.contrib import admin

from rest_framework.authtoken.models import Token
from social_django.models import Association, Nonce, UserSocialAuth

if not settings.DEBUG:
    admin.site.unregister(Association)
    admin.site.unregister(Nonce)
    admin.site.unregister(UserSocialAuth)
    admin.site.unregister(Token)
