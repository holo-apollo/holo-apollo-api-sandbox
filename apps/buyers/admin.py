from django.contrib import admin

from common.admin import Select2ModelAdmin
from .models import Buyer


@admin.register(Buyer)
class BuyerAdmin(Select2ModelAdmin):
    pass
