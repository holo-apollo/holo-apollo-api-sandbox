from django.contrib import admin

from .models import HoloUser


@admin.register(HoloUser)
class HoloUserAdmin(admin.ModelAdmin):
    fields = ('username', 'email', 'phone', 'first_name', 'last_name', 'is_staff', 'is_active',)
    list_display = ('email', 'username', 'phone', 'get_full_name')
