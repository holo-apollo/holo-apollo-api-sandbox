from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

from .models import Good, GoodsCategory


class GoodsCategoryInline(admin.TabularInline):
    model = GoodsCategory
    verbose_name = _('subcategory')
    verbose_name_plural = _('subcategories')
    fields = ['name']


@admin.register(GoodsCategory)
class GoodsCategoryAdmin(admin.ModelAdmin):
    inlines = [GoodsCategoryInline]
    list_display = ['name', 'categories_names_chain']
    readonly_fields = ['categories_names_chain', 'goods_names']


@admin.register(Good)
class GoodAdmin(admin.ModelAdmin):
    fields = ['name', 'description', 'category', 'categories_names']
    readonly_fields = ['categories_names']
    list_display = ['name', 'categories_names']
