from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.translation import pgettext_lazy

from djmoney.models.fields import MoneyField
from djmoney.models.validators import MinMoneyValidator
from model_utils.models import TimeStampedModel

from stores.models.store import Store


class GoodsCategory(TimeStampedModel):
    class Meta:
        verbose_name = _('goods category')
        verbose_name_plural = _('goods categories')
        unique_together = ('name', 'parent_category')

    name = models.CharField(
        verbose_name=pgettext_lazy('not person', 'Name'),
        max_length=30,
        null=False,
        blank=False
    )
    parent_category = models.ForeignKey('self', related_name='subcategories',
                                        on_delete=models.CASCADE, null=True, blank=True,
                                        verbose_name=_('Parent category'))

    def __str__(self):
        return self.name

    def categories_chain(self):
        if self.parent_category:
            return self.parent_category.categories_chain() + (self,)
        return self,

    def all_goods(self):
        qs = self.goods.all()
        for subcategory in self.subcategories.all():
            qs = qs | subcategory.all_goods()
        return qs

    def categories_names_chain(self):
        return ' > '.join([str(category) for category in self.categories_chain()])
    categories_names_chain.short_description = _('Categories names chain')

    def goods_names(self):
        return ', '.join([str(good) for good in self.all_goods()])
    goods_names.short_description = _('Goods names')


class Good(TimeStampedModel):
    class Meta:
        verbose_name = pgettext_lazy('product', 'Good')
        verbose_name_plural = _('Goods')
        unique_together = ('name', 'category')

    name = models.CharField(
        verbose_name=pgettext_lazy('not person', 'Name'),
        max_length=30,
        null=False,
        blank=False
    )
    description = models.TextField(verbose_name=_('Description'), blank=True, default='')
    category = models.ForeignKey(GoodsCategory, related_name='goods', on_delete=models.PROTECT,
                                 verbose_name=_('Category'))
    seller = models.ForeignKey(Store, related_name='goods', on_delete=models.CASCADE,
                               verbose_name=_('Seller'))
    price = MoneyField(
        verbose_name=_('Price'),
        max_digits=14,
        decimal_places=2,
        default_currency='UAH',
        validators=[MinMoneyValidator(0)]
    )

    def __str__(self):
        return f'{self.name} ({self.category})'

    def categories(self):
        return self.category.categories_chain()

    def categories_names(self):
        return ' > '.join([str(category) for category in self.categories()])
    categories_names.short_description = _('Categories names')

    @property
    def categories_ids(self):
        return [category.id for category in self.categories()]
