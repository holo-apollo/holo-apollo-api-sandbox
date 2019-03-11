from django_elasticsearch_dsl_drf.constants import (LOOKUP_FILTER_RANGE, LOOKUP_QUERY_GT,
                                                    LOOKUP_QUERY_GTE, LOOKUP_QUERY_IN,
                                                    LOOKUP_QUERY_LT, LOOKUP_QUERY_LTE)
from django_elasticsearch_dsl_drf.filter_backends import (CompoundSearchFilterBackend,
                                                          DefaultOrderingFilterBackend,
                                                          FilteringFilterBackend, IdsFilterBackend,
                                                          OrderingFilterBackend)
from django_elasticsearch_dsl_drf.viewsets import BaseDocumentViewSet, MoreLikeThisMixin

from common.api.pagination import PaginationWithCountHeader
from goods.documents import GoodDocument
from .serializers import GoodDocumentSerializer


class GoodDocumentViewSet(BaseDocumentViewSet, MoreLikeThisMixin):
    document = GoodDocument
    serializer_class = GoodDocumentSerializer
    pagination_class = PaginationWithCountHeader
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        IdsFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        CompoundSearchFilterBackend
    ]
    search_fields = ['name', 'description']
    filter_fields = {
        'category': {
            'field': 'categories_ids',
            'lookups': [LOOKUP_QUERY_IN]
        },
        'price': {
            'field': 'price',
            'lookups': [
                LOOKUP_FILTER_RANGE,
                LOOKUP_QUERY_GT,
                LOOKUP_QUERY_GTE,
                LOOKUP_QUERY_LT,
                LOOKUP_QUERY_LTE,
            ],
        },
        'price_currency': {
            'field': 'price_currency'
        },
        'seller': {
            'field': 'seller.store_id'
        }
    }
    ordering_fields = {
        'id': 'id',
        'name': 'name.raw',
        'created': 'created',
        'modified': 'modified',
        'price': 'price',
        'price_currency': 'price_currency',
    }
    ordering = ('id',)
    more_like_this_options = {
        'fields': [
            'name',
            'description',
            'categories.name',
            'seller.store_name',
            'specifications.color',
            'specifications.size',
        ],
        'min_term_freq': 1,
        'min_doc_freq': 1,
        'minimum_should_match': '1%',
        'fail_on_unsupported_field': False,
        'analyzer': 'standard',
    }
