import uuid

from django.utils.translation import ugettext as _

from rest_framework.decorators import list_route
from rest_framework.exceptions import NotFound
from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Subscription
from .serializers import SubscriptionSerializer


class SubscriptionViewSet(mixins.CreateModelMixin,
                          viewsets.GenericViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        # Allow updating subscription
        email = request.data.get('email')
        try:
            sub = Subscription.objects.get(email=email)
            subscribe = request.data.get('subscribed', True)
            already_subscribed = False
            if subscribe:
                if not sub.subscribed:
                    sub.subscribed = True
                    sub.save()
                else:
                    already_subscribed = True
            data = self.get_serializer(sub).data
            data['already_subscribed'] = already_subscribed
            return Response(data)
        except Subscription.DoesNotExist:
            return super(SubscriptionViewSet, self).create(request, *args, **kwargs)

    @list_route(methods=['POST'])
    def unsubscribe(self, request):
        try:
            token = request.data.get('token')
            if not token:
                raise NotFound(_('Sorry, subscription not found.'))
            sub = Subscription.objects.get(edit_token=uuid.UUID(token))
            sub.subscribed = False
            sub.save()
            serializer = self.get_serializer(sub)
            return Response(serializer.data)
        except (Subscription.DoesNotExist, ValueError):
            raise NotFound(_('Sorry, subscription not found.'))
