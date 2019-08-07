from django.contrib.auth import get_user_model
from django.db import models
from django.utils.functional import cached_property
from django.utils.translation import gettext_lazy as _

from model_utils.models import TimeStampedModel

UserModel = get_user_model()


class Store(TimeStampedModel):
    store_name = models.CharField(
        verbose_name=_('Store name'),
        max_length=50, unique=True
    )
    description = models.TextField()
    location = models.CharField(max_length=50)
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

    @cached_property
    def rating(self):
        return 4.8

    @cached_property
    def goods_count(self):
        return self.goods.count()
