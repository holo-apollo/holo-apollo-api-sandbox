from django.core.validators import MinLengthValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from model_utils.models import TimeStampedModel


class StoreApplication(TimeStampedModel):
    CLOTHES = 'clothes'
    JEWELRY = 'jewelry'
    ACCESSORIES = 'accessories'
    HOME_DECOR = 'home_decor'
    SHOES = 'shoes'
    OTHER = 'other'

    CATEGORY_CHOICES = (
        ('', _('Category')),
        (CLOTHES, _('Clothes')),
        (JEWELRY, _('Jewelry')),
        (ACCESSORIES, _('Accessories')),
        (HOME_DECOR, _('Home decor')),
        (SHOES, _('Shoes')),
        (OTHER, _('Other')),
    )

    name = models.CharField(
        verbose_name=_('Name'),
        max_length=61,
        help_text=_('What is your name?')
    )
    email = models.EmailField(
        verbose_name=_('Email'),
        max_length=254,
        unique=True,
        help_text=_('Email to reach you out'),
        error_messages={
            'unique': _('That email address is already used.')
        }
    )
    instagram_name = models.CharField(
        verbose_name=_('Instagram name'),
        max_length=254,
        unique=True,
        help_text=_('@Name in Instagram'),
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
        max_length=500,
        help_text=_("What's being sold in your store?")
    )
    goods_description = models.TextField(
        verbose_name=_('Goods description'),
        max_length=1000,
        validators=[MinLengthValidator(500)],
        help_text=_('Describe your goods (materials, technology, prices...)')
    )
    philosophy = models.TextField(
        verbose_name=_('Philosophy'),
        max_length=1000,
        validators=[MinLengthValidator(500)],
        help_text=_('Philosophy behind your store')
    )
    data_usage_agreement = models.BooleanField(
        verbose_name=_('Data usage agreement'),
        default=False,
        help_text=_('I allow usage of data I provided')
    )
    pub_date = models.DateField(
        verbose_name=_('Publication date'),
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = _('Store application')
        verbose_name_plural = _('Store applications')

    def __str__(self):
        return f'Application: {self.email} {self.instagram_name}'

    def save(self, *args, **kwargs):
        if not self.pub_date:
            last_publication = StoreApplication.objects.aggregate(
                models.Max('pub_date'))['pub_date__max']
            if last_publication:
                self.pub_date = last_publication + timezone.timedelta(days=2)
        return super().save(*args, **kwargs)
