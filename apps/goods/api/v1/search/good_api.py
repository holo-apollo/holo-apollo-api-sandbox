from django_elasticsearch_dsl_drf.constants import LOOKUP_QUERY_IN
from django_elasticsearch_dsl_drf.filter_backends import (DefaultOrderingFilterBackend,
                                                          FilteringFilterBackend,
                                                          OrderingFilterBackend,
                                                          SearchFilterBackend)
from django_elasticsearch_dsl_drf.viewsets import BaseDocumentViewSet

from goods.documents import GoodDocument
from .serializers import GoodDocumentSerializer


class GoodDocumentViewSet(BaseDocumentViewSet):
    document = GoodDocument
    serializer_class = GoodDocumentSerializer
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        SearchFilterBackend
    ]
    search_fields = ['name', 'description']
    filter_fields = {
        'category': {
            'field': 'categories_ids',
            'lookups': [LOOKUP_QUERY_IN]
        }
    }
    ordering_fields = {
        'id': 'id',
        'name': 'name.raw',
        'created': 'created',
        'modified': 'modified'
    }
    ordering = ('id',)
