from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class StoresConfig(AppConfig):
    name = 'stores'
    verbose_name = _('Stores')
