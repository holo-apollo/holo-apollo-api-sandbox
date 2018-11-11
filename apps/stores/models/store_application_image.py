from django.db import models
from django.utils.translation import ugettext_lazy as _

from .store_application import StoreApplication


def upload_path(instance, filename):
    return f'{instance.application.instagram_name}/{filename}'


class StoreApplicationImage(models.Model):
    application = models.ForeignKey(
        StoreApplication,
        verbose_name=_('Application'),
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(
        verbose_name=_('Image'),
        upload_to=upload_path
    )

    class Meta:
        verbose_name = _('Store application image')
        verbose_name_plural = _('Store application images')
