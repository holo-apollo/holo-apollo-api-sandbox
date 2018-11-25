from django.conf import settings
from django.contrib import admin
from django.db.models import ForeignKey, ManyToManyField, OneToOneField

from rest_framework.authtoken.models import Token
from social_django.models import Association, Nonce, UserSocialAuth

from select2.forms import Select, SelectMultiple


class Select2ModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        ForeignKey: {'widget': Select},
        OneToOneField: {'widget': Select},
        ManyToManyField: {'widget': SelectMultiple}
    }


if not settings.DEBUG:
    admin.site.unregister(Association)
    admin.site.unregister(Nonce)
    admin.site.unregister(UserSocialAuth)
    admin.site.unregister(Token)
