from django.contrib import admin

from .models import GoodOrder, Order


class GoodOrderInline(admin.TabularInline):
    model = GoodOrder
    fields = ['buyer', 'good', 'quantity', 'total_cost']
    readonly_fields = ['total_cost']
    autocomplete_fields = ['good']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['seller', 'buyer', 'goods_names', 'status', 'created', 'rating']
    fields = ['seller', 'buyer', 'status', 'delivery_city', 'delivery_method', 'delivery_info',
              'created', 'modified', 'rating']
    readonly_fields = ['seller', 'buyer', 'created', 'modified']
    inlines = [GoodOrderInline]


@admin.register(GoodOrder)
class GoodOrderAdmin(admin.ModelAdmin):
    list_display = ['buyer', 'seller', 'good', 'quantity', 'total_cost', 'order_id']
    fields = ['buyer', 'seller', 'good', 'quantity', 'total_cost', 'order']
    readonly_fields = ['seller', 'total_cost']
    autocomplete_fields = ['buyer', 'good']
    raw_id_fields = ['order']
