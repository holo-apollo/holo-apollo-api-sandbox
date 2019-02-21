from django.db import models
from django.utils.translation import gettext_lazy as _

from .store_application import StoreApplication


class StoreApplicationImage(models.Model):
    application = models.ForeignKey(
        StoreApplication,
        verbose_name=_('Application'),
        on_delete=models.CASCADE,
        related_name='images'
    )
    image_url = models.URLField(verbose_name=_('Image URL'))

    class Meta:
        verbose_name = _('Store application image')
        verbose_name_plural = _('Store application images')
