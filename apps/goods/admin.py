from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

from common.admin import Select2ModelAdmin
from .models import Good, GoodsCategory


class GoodsCategoryInline(admin.TabularInline):
    model = GoodsCategory
    verbose_name = _('subcategory')
    verbose_name_plural = _('subcategories')
    fields = ['name']


@admin.register(GoodsCategory)
class GoodsCategoryAdmin(Select2ModelAdmin):
    inlines = [GoodsCategoryInline]
    list_display = ['name', 'categories_names_chain']
    readonly_fields = ['categories_names_chain', 'goods_names']


@admin.register(Good)
class GoodAdmin(Select2ModelAdmin):
    readonly_fields = ['categories_names']
    list_display = ['name', 'categories_names', 'seller', 'price']
