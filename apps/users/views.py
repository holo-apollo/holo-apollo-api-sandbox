import uuid

from django.contrib.auth import login, authenticate, views
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.utils.translation import ugettext as _
from django.urls import reverse
from django.views import View

from rest_framework.decorators import list_route
from rest_framework.exceptions import NotFound, AuthenticationFailed
from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Subscription, HoloUser
from .serializers import SubscriptionSerializer, HoloUserSerializer


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


class HoloUserViewSet(mixins.CreateModelMixin,
                      viewsets.GenericViewSet):
    queryset = HoloUser.objects.all()
    serializer_class = HoloUserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        super(HoloUserViewSet, self).perform_create(serializer)
        login(self.request, serializer.instance)

    @list_route(methods=['POST'])
    def login(self, request):
        user = authenticate(
            request,
            username=request.data.get('username'),
            password=request.data.get('password')
        )

        if not user:
            raise AuthenticationFailed

        login(request, user)
        serializer = self.get_serializer(user)
        return Response(serializer.data)


class ConfirmEmail(LoginRequiredMixin, View):
    def get(self, request):
        instance = request.user
        try:
            token = uuid.UUID(self.request.GET.get('token'))
        except (ValueError, TypeError):
            token = None

        if token != instance.email_confirm_token:
            messages.warning(
                request,
                _('Looks like you\'ve followed the wrong link for email verification')
            )
        elif not instance.email_confirmed:
            instance.email_confirmed = True
            instance.save()
            messages.success(request, _('Your email is verified successfully!'))
        else:
            messages.info(request, _('Your email is already verified'))

        return HttpResponseRedirect(reverse('index'))
