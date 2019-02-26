from rest_framework import routers

from .views import StoreApplicationImageViewSet, StoreApplicationViewSet, StoreViewSet

router = routers.SimpleRouter()
router.register(r'stores', StoreViewSet)
router.register(r'stores/applications', StoreApplicationViewSet)
router.register(r'stores/applications/(?P<application_pk>\d+)/images',
                StoreApplicationImageViewSet)
