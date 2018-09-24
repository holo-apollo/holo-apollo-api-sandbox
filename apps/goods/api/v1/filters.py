import django_filters

from goods.models import Good


class GoodFilter(django_filters.FilterSet):
    price__gte = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    price__lte = django_filters.NumberFilter(field_name='price', lookup_expr='lte')

    class Meta:
        model = Good
        fields = ['price_currency', 'seller', 'price__gte', 'price__lte']
