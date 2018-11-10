from django.utils.translation import ugettext as _

from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from common.api.views import MultiSerializerViewSetMixin
from users.models import Subscription
from .serializers import SubscriptionSerializer, UnsubscribeSerializer


class SubscriptionViewSet(MultiSerializerViewSetMixin, mixins.CreateModelMixin,
                          viewsets.GenericViewSet):
    """
    create:
    Creates new active subscription by passing new `email`
    or activates existing subscription by passing existing `email`.
    In case of update `already_subscribed` field will be present
    in response data.

    """

    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    serializer_action_classes = {
        'unsubscribe': UnsubscribeSerializer
    }
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Allow updating subscription
        email = serializer.validated_data.get('email')
        try:
            sub = Subscription.objects.get(email=email)
            already_subscribed = False
            if not sub.subscribed:
                sub.subscribed = True
                sub.save()
            else:
                already_subscribed = True
            data = serializer.data
            data['already_subscribed'] = already_subscribed
            resp_status = status.HTTP_200_OK
        except Subscription.DoesNotExist:
            self.perform_create(serializer)
            data = serializer.data
            resp_status = status.HTTP_201_CREATED
        headers = self.get_success_headers(serializer.data)
        return Response(data, status=resp_status, headers=headers)

    @action(methods=['POST'], detail=False)
    def unsubscribe(self, request):
        """
        Deactivates subscription identified by edit token.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            token = serializer.validated_data['token']
            sub = Subscription.objects.get(edit_token=token)
            sub.subscribed = False
            sub.save()
            serializer = self.get_serializer(sub)
            return Response(serializer.data)
        except (Subscription.DoesNotExist, ValueError):
            raise NotFound(_('Sorry, subscription not found.'))
