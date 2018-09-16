from rest_framework.viewsets import ModelViewSet

from goods.models import Good
from .permissions import GoodPermission
from .serializers import GoodSerializer


class GoodViewSet(ModelViewSet):
    queryset = Good.objects.all()
    serializer_class = GoodSerializer
    permission_classes = [GoodPermission]
