from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class BuyersConfig(AppConfig):
    name = 'buyers'
    verbose_name = _('Buyers')
