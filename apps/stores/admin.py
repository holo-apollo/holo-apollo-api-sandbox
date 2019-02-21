from django.contrib import admin
from django.db.models import URLField

from common.forms import ImageUrlWidget
from .models.store import Store
from .models.store_application import StoreApplication
from .models.store_application_image import StoreApplicationImage


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    search_fields = ('store_name',)
    autocomplete_fields = ('user',)


class StoreApplicationImageInline(admin.TabularInline):
    model = StoreApplicationImage
    fields = ('image_url',)
    formfield_overrides = {
        URLField: {'widget': ImageUrlWidget},
    }
    extra = 0


@admin.register(StoreApplication)
class StoreApplicationAdmin(admin.ModelAdmin):
    ordering = ('-pub_date',)
    list_display = ('name', 'email', 'instagram_name', 'category', 'pub_date', 'is_published')
    inlines = [StoreApplicationImageInline]
