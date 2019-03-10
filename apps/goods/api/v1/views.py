from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from goods.models import Good, GoodsCategory
from .filters import GoodFilter
from .permissions import GoodPermission
from .serializers import GoodsCategorySerializer, GoodSerializer


class GoodViewSet(ModelViewSet):
    queryset = Good.objects.all()
    serializer_class = GoodSerializer
    permission_classes = [GoodPermission]
    filter_class = GoodFilter
    search_fields = ['name', 'description']
    ordering_fields = ['id', 'name', 'created', 'modified', 'price', 'price_currency']


class GoodsCategoryViewSet(ModelViewSet):
    queryset = GoodsCategory.objects.main()
    serializer_class = GoodsCategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None
