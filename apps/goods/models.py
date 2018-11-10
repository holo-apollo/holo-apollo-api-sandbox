from django.db import models
from django.utils.translation import ugettext_lazy as _

from djmoney.models.fields import MoneyField
from djmoney.models.validators import MinMoneyValidator
from model_utils.models import TimeStampedModel

from stores.models import Store


class GoodsCategory(TimeStampedModel):
    class Meta:
        verbose_name_plural = _('goods categories')
        unique_together = ('name', 'parent_category')

    name = models.CharField(max_length=30, null=False, blank=False)
    parent_category = models.ForeignKey('self', related_name='subcategories',
                                        on_delete=models.CASCADE, null=True, blank=True)

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

    def goods_names(self):
        return ', '.join([str(good) for good in self.all_goods()])


class Good(TimeStampedModel):
    class Meta:
        unique_together = ('name', 'category')

    name = models.CharField(max_length=30, null=False, blank=False)
    description = models.TextField(blank=True, default='')
    category = models.ForeignKey(GoodsCategory, related_name='goods', on_delete=models.PROTECT)
    seller = models.ForeignKey(Store, related_name='goods', on_delete=models.CASCADE)
    price = MoneyField(max_digits=14, decimal_places=2, default_currency='UAH',
                       validators=[MinMoneyValidator(0)])

    def __str__(self):
        return f'{self.name} ({self.category})'

    def categories(self):
        return self.category.categories_chain()

    def categories_names(self):
        return ' > '.join([str(category) for category in self.categories()])

    @property
    def categories_ids(self):
        return [category.id for category in self.categories()]
