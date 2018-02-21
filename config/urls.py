from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include
from django.views.i18n import JavaScriptCatalog

from rest_framework.routers import DefaultRouter
from rest_framework import urls as drf_urls

from common.views import index, about
from users.views import SubscriptionViewSet, HoloUserViewSet, ConfirmEmail, LoginView, SignupView


router = DefaultRouter()
router.register(r'subscriptions', SubscriptionViewSet)
router.register(r'users', HoloUserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('logout/', auth_views.logout, name='logout'),
    path('about/', about, name='about'),
    path('confirm-email/', ConfirmEmail.as_view(), name='confirm-email'),
    path('api-auth/', include(drf_urls)),
    path('api/', include(router.urls)),
    path('jsi18n/', JavaScriptCatalog.as_view(), name='javascript-catalog'),
    path('oauth/', include('social_django.urls', namespace='social')),
    path('', index, name='index'),
]
