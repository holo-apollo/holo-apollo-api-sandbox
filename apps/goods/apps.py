from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class GoodsConfig(AppConfig):
    name = 'goods'
    verbose_name = _('Goods')
