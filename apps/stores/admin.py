from django.contrib import admin

from .models import Store


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    raw_id_fields = ['user']
