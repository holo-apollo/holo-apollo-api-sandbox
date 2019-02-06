from django.conf import settings
from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from rest_framework.authtoken.models import Token
from social_django.models import Association, Nonce, UserSocialAuth

if not settings.DEBUG:
    admin.site.unregister(Association)
    admin.site.unregister(Nonce)
    admin.site.unregister(UserSocialAuth)
    admin.site.unregister(Token)

admin.site.site_title = _('Holo-Apollo site admin')
admin.site.site_header = _('Holo-Apollo administration')
