from django.contrib import admin

from common.admin import Select2ModelAdmin
from .models import Store, StoreApplication


@admin.register(Store)
class StoreAdmin(Select2ModelAdmin):
    pass


@admin.register(StoreApplication)
class StoreApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'instagram_name', 'category',)
