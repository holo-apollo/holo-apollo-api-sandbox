from django.core.validators import MinLengthValidator
from django.db import models
from django.utils.translation import ugettext_lazy as _

from model_utils.models import TimeStampedModel


class StoreApplication(TimeStampedModel):
    CLOTHES = 'clothes'
    JEWELRY = 'jewelry'
    ACCESSORIES = 'accessories'
    HOME_DECOR = 'home_decor'
    SHOES = 'shoes'

    CATEGORY_CHOICES = (
        (CLOTHES, _('Clothes')),
        (JEWELRY, _('Jewelry')),
        (ACCESSORIES, _('Accessories')),
        (HOME_DECOR, _('Home decor')),
        (SHOES, _('Shoes')),
    )

    name = models.CharField(verbose_name=_('Name'), max_length=61)
    email = models.EmailField(
        verbose_name=_('Email'),
        max_length=254,
        unique=True,
        error_messages={
            'unique': _('That email address is already used.')
        }
    )
    instagram_name = models.CharField(
        verbose_name=_('Instagram name'),
        max_length=254,
        unique=True,
        error_messages={
            'unique': _('That Instagram name is already used.')
        }
    )
    category = models.CharField(
        verbose_name=_('Category'),
        max_length=30,
        choices=CATEGORY_CHOICES,
    )
    selling_goods = models.TextField(
        verbose_name=_('Selling goods'),
        max_length=500
    )
    goods_description = models.TextField(
        verbose_name=_('Goods description'),
        max_length=1000,
        validators=[MinLengthValidator(500)]
    )
    philosophy = models.TextField(
        verbose_name=_('Philosophy'),
        max_length=1000,
        validators=[MinLengthValidator(500)]
    )
    data_usage_agreement = models.BooleanField(
        verbose_name=_('Data usage agreement'),
        default=False
    )

    def __str__(self):
        return f'Application: {self.email} {self.instagram_name}'
