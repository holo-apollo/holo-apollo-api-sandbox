from rest_framework.mixins import CreateModelMixin
from rest_framework.viewsets import GenericViewSet

from stores.models.store_application import StoreApplication
from .serializers import StoreApplicationSerializer


class StoreApplicationViewSet(CreateModelMixin, GenericViewSet):
    queryset = StoreApplication.objects.all()
    serializer_class = StoreApplicationSerializer
