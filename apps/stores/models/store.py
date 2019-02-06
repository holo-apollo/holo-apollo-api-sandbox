from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from model_utils.models import TimeStampedModel

UserModel = get_user_model()


class Store(TimeStampedModel):
    store_name = models.CharField(
        verbose_name=_('Store name'),
        max_length=30, unique=True
    )
    user = models.OneToOneField(
        UserModel,
        verbose_name=_('User'),
        related_name='_store',
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = _('Store')
        verbose_name_plural = _('Stores')

    def __str__(self):
        return f'Store: {self.user}'
