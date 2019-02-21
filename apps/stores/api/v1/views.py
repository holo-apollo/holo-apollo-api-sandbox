from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from stores.models.store_application import StoreApplication
from stores.models.store_application_image import StoreApplicationImage
from .serializers import StoreApplicationImageSerializer, StoreApplicationSerializer


class StoreApplicationViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = StoreApplication.objects.all()
    serializer_class = StoreApplicationSerializer
    permission_classes = [AllowAny]

    @action(methods=['get'], detail=False)
    def categories(self, request, *args, **kwargs):
        return Response(StoreApplication.get_category_options())


class StoreApplicationImageViewSet(mixins.CreateModelMixin, GenericViewSet):
    queryset = StoreApplicationImage.objects.all()
    serializer_class = StoreApplicationImageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return super().get_queryset().filter(application=self.kwargs['application_pk'])
