from django.contrib import admin

from .models import HoloUser, Subscription


@admin.register(HoloUser)
class HoloUserAdmin(admin.ModelAdmin):
    fields = ('username', 'email', 'phone', 'first_name', 'last_name', 'avatar', 'is_staff',
              'is_active', 'email_confirmed', 'email_confirm_token',)
    readonly_fields = ('email_confirm_token',)
    list_display = ('email', 'username', 'phone', 'get_full_name')


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    fields = ('email', 'subscribed', 'created', 'modified', 'edit_token')
    readonly_fields = ('created', 'modified', 'edit_token')
    list_display = ('email', 'subscribed', 'created', 'modified',)
