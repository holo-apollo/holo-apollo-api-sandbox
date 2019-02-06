from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from model_utils.models import TimeStampedModel

UserModel = get_user_model()


class Buyer(TimeStampedModel):
    user = models.OneToOneField(UserModel, related_name='_buyer', on_delete=models.CASCADE,
                                verbose_name=_('User'))

    class Meta:
        verbose_name = _('Buyer')
        verbose_name_plural = _('Buyers')

    def __str__(self):
        return f'Buyer: {self.user}'
