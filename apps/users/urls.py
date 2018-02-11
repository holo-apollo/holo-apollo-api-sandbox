from django.urls import path

from .views import SubscriptionCreateView, SubscriptionSuccessView

app_name = 'users'

urlpatterns = [
    path('subscribe/', SubscriptionCreateView.as_view(), name='subscribe'),
    path('subscribe-success/', SubscriptionSuccessView.as_view(), name='subscribe-success')
]
