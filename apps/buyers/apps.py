from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class BuyersConfig(AppConfig):
    name = 'buyers'
    verbose_name = _('Buyers')
