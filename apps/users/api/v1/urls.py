from rest_framework import routers

from .subscription_api import SubscriptionViewSet
from .user_api import HoloUserViewSet

router = routers.SimpleRouter()
router.register(r'subscriptions', SubscriptionViewSet)
router.register(r'users', HoloUserViewSet)
