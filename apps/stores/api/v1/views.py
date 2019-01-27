from rest_framework import mixins, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from stores.models.store_application import StoreApplication
from .serializers import StoreApplicationImageSerializer, StoreApplicationSerializer


class StoreApplicationViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = StoreApplication.objects.all()
    serializer_class = StoreApplicationSerializer
    permission_classes = [AllowAny]

    @action(methods=['post'], detail=True)
    def images(self, request, *args, **kwargs):
        application_id = self.kwargs['pk']
        images = request.FILES.getlist('images')
        data = [{
            'application': application_id,
            'image': image,
        } for image in images]
        serializer = StoreApplicationImageSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
            response_data = StoreApplicationSerializer(self.get_object()).data
            return Response(response_data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
