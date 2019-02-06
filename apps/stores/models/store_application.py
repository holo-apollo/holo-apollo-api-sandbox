from django.conf import settings
from django.core.validators import MinLengthValidator
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from model_utils.models import TimeStampedModel

from common.tasks import send_email_to_managers


class StoreApplication(TimeStampedModel):
    CLOTHES = 'clothes'
    JEWELRY = 'jewelry'
    ACCESSORIES = 'accessories'
    HOME_DECOR = 'home_decor'
    SHOES = 'shoes'
    ART = 'art'
    OTHER = 'other'

    CATEGORY_CHOICES = (
        ('', _('Category')),
        (CLOTHES, _('Clothes')),
        (JEWELRY, _('Jewelry')),
        (ACCESSORIES, _('Accessories')),
        (HOME_DECOR, _('Home decor')),
        (SHOES, _('Shoes')),
        (ART, _('Art')),
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
        validators=[MinLengthValidator(100)],
        help_text=_('Describe your goods (materials, technology, prices...)')
    )
    philosophy = models.TextField(
        verbose_name=_('Philosophy'),
        max_length=1000,
        validators=[MinLengthValidator(100)],
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

    def is_published(self):
        return self.pub_date < timezone.now().date()
    is_published.short_description = _('Published')
    is_published.boolean = True

    def save(self, *args, **kwargs):
        if not self.pub_date:
            last_publication = StoreApplication.objects.aggregate(
                models.Max('pub_date'))['pub_date__max'] or timezone.now().date()
            self.pub_date = last_publication + timezone.timedelta(days=2)
        is_new = not self.pk
        super().save(*args, **kwargs)
        if is_new:
            url = reverse('admin:stores_storeapplication_change', kwargs={'object_id': self.id})
            send_email_to_managers.delay(
                subject="Новая заявка от магазина",
                message=f"Поступила новая заявка от магазина: {settings.SITE_URL}{url}"
            )

    @classmethod
    def get_category_options(cls):
        return [{
            'value': option[0],
            'label': option[1],
        } for option in cls.CATEGORY_CHOICES if option[0]]
