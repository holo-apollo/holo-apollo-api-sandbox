from django.contrib import admin
from django.db.models import URLField
from django.utils.translation import gettext_lazy as _

from common.forms import ImageUrlWidget
from .models import Good, GoodImage, GoodsCategory, GoodSpecifications


class GoodsCategoryInline(admin.TabularInline):
    model = GoodsCategory
    verbose_name = _('subcategory')
    verbose_name_plural = _('subcategories')
    fields = ['name', 'slug']


class GoodSpecificationsInline(admin.StackedInline):
    model = GoodSpecifications
    autocomplete_fields = ['color', 'size']


class GoodImageInline(admin.TabularInline):
    model = GoodImage
    fields = ['image_url', 'is_main']
    formfield_overrides = {
        URLField: {'widget': ImageUrlWidget},
    }
    extra = 0


@admin.register(GoodsCategory)
class GoodsCategoryAdmin(admin.ModelAdmin):
    inlines = [GoodsCategoryInline]
    list_display = ['name', 'categories_names_chain']
    readonly_fields = ['categories_names_chain', 'goods_names']
    autocomplete_fields = ['parent_category']
    search_fields = ['name']
    prepopulated_fields = {"slug": ('name_en',)}


@admin.register(Good)
class GoodAdmin(admin.ModelAdmin):
    readonly_fields = ['categories_names_chain']
    list_display = ['name', 'categories_names_chain', 'seller', 'price']
    autocomplete_fields = ['category', 'seller']
    inlines = [GoodSpecificationsInline, GoodImageInline]
    search_fields = ['name']
