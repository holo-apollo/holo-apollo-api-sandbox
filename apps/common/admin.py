from django.contrib import admin
from django.db.models import ForeignKey, ManyToManyField, OneToOneField

from select2.forms import Select, SelectMultiple


class Select2ModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        ForeignKey: {'widget': Select},
        OneToOneField: {'widget': Select},
        ManyToManyField: {'widget': SelectMultiple}
    }
