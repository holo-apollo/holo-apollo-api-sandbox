from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, re_path, include
from django.views.i18n import JavaScriptCatalog

from rest_framework.routers import DefaultRouter
from rest_framework import urls as drf_urls

from common.views import index, about
from users.views import SubscriptionViewSet, HoloUserViewSet, ConfirmEmail, LoginView, SignupView


router = DefaultRouter()
router.register(r'subscriptions', SubscriptionViewSet)
router.register(r'users', HoloUserViewSet)

urlpatterns = [
    # Django
    path('admin/', admin.site.urls),
    path('jsi18n/', JavaScriptCatalog.as_view(), name='javascript-catalog'),

    # Auth
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('logout/', auth_views.logout, name='logout'),
    path('password_reset/', auth_views.password_reset, name='password_reset'),
    path('password_reset/done/', auth_views.password_reset_done, name='password_reset_done'),
    re_path(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
            auth_views.password_reset_confirm, name='password_reset_confirm'),
    path('reset/done/', auth_views.password_reset_complete, name='password_reset_complete'),
    path('oauth/', include('social_django.urls', namespace='social')),

    # DRF
    path('api-auth/', include(drf_urls)),
    path('api/', include(router.urls)),

    # Custom
    path('about/', about, name='about'),
    path('confirm-email/', ConfirmEmail.as_view(), name='confirm-email'),
    path('', index, name='index'),
]
