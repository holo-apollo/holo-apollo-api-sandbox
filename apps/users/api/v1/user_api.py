from django.contrib.auth import authenticate, login

from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from common.api.views import MultiSerializerViewSetMixin
from users.models import HoloUser
from .serializers import HoloUserSerializer


class HoloUserViewSet(MultiSerializerViewSetMixin, mixins.CreateModelMixin,
                      viewsets.GenericViewSet):
    """
    create:
    Creates new user and logs them in.

    """
    queryset = HoloUser.objects.all()
    serializer_class = HoloUserSerializer
    permission_classes = [AllowAny]
    filter_fields = ['email']

    def perform_create(self, serializer):
        super(HoloUserViewSet, self).perform_create(serializer)
        login(self.request, serializer.instance, backend='users.login_backend.HoloModelBackend')

    @action(methods=['POST'], detail=False)
    def login(self, request):
        """
        Authenticates user and logs them in.
        """
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

    @action(methods=['GET'], detail=False)
    def check_email(self, request, *args, **kwargs):
        """
        Checks that user with provided via query param `email` exists.
        """
        # TODO: how to document query params?
        email = request.GET.get('email')
        return Response({
            'email_exists': HoloUser.objects.filter(email=email).exists()
        })
