from django.contrib.postgres.fields import CICharField
from django.db import models
from django.utils.translation import gettext_lazy as _


class Color(models.Model):
    class Meta:
        verbose_name = _('Color')
        verbose_name_plural = _('Colors')

    definition = CICharField(max_length=30, unique=True, verbose_name=_('Definition'))

    def __str__(self):
        return self.definition


class Size(models.Model):
    class Meta:
        verbose_name = _('Size')
        verbose_name_plural = _('Sizes')

    definition = CICharField(max_length=30, unique=True, verbose_name=_('Definition'))

    def __str__(self):
        return self.definition
