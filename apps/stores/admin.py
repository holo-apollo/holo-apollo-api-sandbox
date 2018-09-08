from django.contrib import admin

from common.admin import Select2ModelAdmin
from .models import Store


@admin.register(Store)
class StoreAdmin(Select2ModelAdmin):
    pass
