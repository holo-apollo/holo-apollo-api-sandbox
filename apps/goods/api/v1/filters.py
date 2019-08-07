from django_filters import rest_framework as filters

from goods.models import GoodsCategory


class GoodsCategoryFilter(filters.FilterSet):
    is_main = filters.BooleanFilter(field_name='parent_category', lookup_expr='isnull')

    class Meta:
        model = GoodsCategory
        fields = ['is_main']
