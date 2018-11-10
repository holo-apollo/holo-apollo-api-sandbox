from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _

from .models import HoloUser, Subscription


@admin.register(HoloUser)
class HoloUserAdmin(UserAdmin):
    readonly_fields = ('email_confirm_token',)
    list_display = ('email', 'username', 'phone', 'get_full_name')

    fieldsets = (
        (None, {'fields': ('username', 'password', 'email_confirmed', 'email_confirm_token')}),
        (_('Personal info'), {'fields': ('email', 'phone', 'first_name', 'first_name_ru',
                                         'first_name_uk', 'first_name_en', 'last_name',
                                         'last_name_ru', 'last_name_uk', 'last_name_en',
                                         'avatar')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',)}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    fields = ('email', 'subscribed', 'created', 'modified', 'edit_token')
    readonly_fields = ('created', 'modified', 'edit_token')
    list_display = ('email', 'subscribed', 'created', 'modified',)
