from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework import urls as drf_urls

from common.views import index
from users.views import SubscriptionViewSet


router = DefaultRouter()
router.register(r'subscriptions', SubscriptionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include(drf_urls)),
    path('api/', include(router.urls)),
    path('', index, name='index'),
]
