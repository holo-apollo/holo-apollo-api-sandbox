from rest_framework import routers

from .views import StoreApplicationViewSet

router = routers.SimpleRouter()
router.register(r'stores/applications', StoreApplicationViewSet)
