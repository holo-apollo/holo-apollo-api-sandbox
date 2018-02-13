from rest_framework.exceptions import PermissionDenied
from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny

from .models import Subscription
from .serializers import SubscriptionSerializer


class SubscriptionViewSet(mixins.CreateModelMixin,
                          mixins.UpdateModelMixin,
                          viewsets.GenericViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [AllowAny]

    def update(self, request, *args, **kwargs):
        sub = self.get_object()
        if request.data.get('token') != sub.edit_token.hex:
            raise PermissionDenied
        return super(SubscriptionViewSet, self).update(request, *args, **kwargs)
