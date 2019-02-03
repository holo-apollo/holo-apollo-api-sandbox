from rest_framework import mixins, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from common.api.views import MultiSerializerViewSetMixin
from stores.models.store_application import StoreApplication
from .serializers import (StoreApplicationImageSerializer, StoreApplicationReadOnlySerializer,
                          StoreApplicationSerializer)


class StoreApplicationViewSet(MultiSerializerViewSetMixin, mixins.CreateModelMixin,
                              mixins.UpdateModelMixin, GenericViewSet):
    queryset = StoreApplication.objects.all()
    serializer_class = StoreApplicationSerializer
    serializer_action_classes = {
        'images': StoreApplicationReadOnlySerializer,
    }
    permission_classes = [AllowAny]

    @action(methods=['put'], detail=True)
    def images(self, request, *args, **kwargs):
        application_id = self.kwargs['pk']
        images = request.FILES.getlist('images')
        data = [{
            'application': application_id,
            'image': image,
        } for image in images]
        images_serializer = StoreApplicationImageSerializer(data=data, many=True)
        if images_serializer.is_valid():
            images_serializer.save()
            serializer = self.get_serializer(self.get_object())
            return Response(serializer.data)
        return Response(images_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=False)
    def categories(self, request, *args, **kwargs):
        return Response(StoreApplication.get_category_options())
