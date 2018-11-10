from django.contrib import admin
from django.db.models import ImageField

from common.admin import Select2ModelAdmin
from common.forms import ImageWidget
from .forms import StoreApplicationForm
from .models import Store, StoreApplication, StoreApplicationImage


@admin.register(Store)
class StoreAdmin(Select2ModelAdmin):
    pass


class StoreApplicationImageInline(admin.TabularInline):
    model = StoreApplicationImage
    fields = ('image',)
    formfield_overrides = {
        ImageField: {'widget': ImageWidget}
    }
    extra = 0

    def has_add_permission(self, request, obj):
        return False


@admin.register(StoreApplication)
class StoreApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'instagram_name', 'category',)
    form = StoreApplicationForm
    inlines = [StoreApplicationImageInline]
