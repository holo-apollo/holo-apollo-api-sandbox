from django.contrib.postgres.fields import JSONField
from django.core.validators import MaxValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.translation import pgettext_lazy

from model_utils.models import TimeStampedModel

from goods.models import Good
from users.models import HoloUser


class Order(TimeStampedModel):
    NEW = 'new'
    ACCEPTED = 'accepted'
    SENT = 'sent'
    COMPLETED = 'completed'

    STATUSES = (
        (NEW, _('New')),
        (ACCEPTED, _('Accepted')),
        (SENT, _('Sent')),
        (COMPLETED, _('Completed')),
    )

    PICKUP = 'pickup'
    NEW_POST_BRANCH = 'new_post_branch'
    NEW_POST_EXPRESS = 'new_post_express'

    DELIVERY_METHODS = (
        (PICKUP, _('Pickup')),
        (NEW_POST_BRANCH, _('New post branch')),
        (NEW_POST_EXPRESS, _('New post express')),
    )

    status = models.CharField(max_length=20, choices=STATUSES, default=NEW,
                              verbose_name=_('Status'))
    delivery_city = models.CharField(max_length=50, verbose_name=_('Delivery city'))
    delivery_method = models.CharField(max_length=30, choices=DELIVERY_METHODS,
                                       verbose_name=_('Delivery method'))
    delivery_info = JSONField(verbose_name=_('Delivery info'))
    rating = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MaxValueValidator(5)], verbose_name=_('Rating'))

    @property
    def seller(self):
        good_order = self.good_orders.first()
        return good_order.good.seller if good_order else None

    @property
    def buyer(self):
        good_order = self.good_orders.first()
        return good_order.buyer if good_order else None

    @property
    def goods_names(self):
        return ', '.join(self.good_orders.values_list('good__name', flat=True))

    def __str__(self):
        return _('Order %(order_id)d. Seller: %(seller)s; buyer: %(buyer)s') % {
            'order_id': self.id,
            'seller': self.seller.store_name if self.seller else '-',
            'buyer': self.buyer.get_full_name() if self.buyer else '-',
        }

    class Meta:
        verbose_name = _('Order')
        verbose_name_plural = _('Orders')


class GoodOrder(TimeStampedModel):
    class Meta:
        verbose_name = _('Good order')
        verbose_name_plural = _('Good orders')

    buyer = models.ForeignKey(HoloUser, on_delete=models.CASCADE, related_name='good_orders',
                              verbose_name=_('Buyer'))
    good = models.ForeignKey(Good, on_delete=models.CASCADE, related_name='good_orders',
                             verbose_name=pgettext_lazy('product', 'Good'))
    quantity = models.PositiveSmallIntegerField(default=1, verbose_name=_('Quantity'))
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='good_orders',
                              null=True, blank=True, verbose_name=_('Order'))

    def __str__(self):
        return _('Buyer: %(buyer)s. Good: %(good)s') % {
            'buyer': self.buyer.get_full_name(),
            'good': self.good.name,
        }

    @property
    def seller(self):
        return self.good.seller

    @property
    def total_cost(self):
        return self.good.final_price * self.quantity

    @property
    def is_preorder(self):
        return self.order is None
