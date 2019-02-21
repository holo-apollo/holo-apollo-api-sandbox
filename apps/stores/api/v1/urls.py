from rest_framework import routers

from .views import StoreApplicationImageViewSet, StoreApplicationViewSet

router = routers.SimpleRouter()
router.register(r'stores/applications', StoreApplicationViewSet)

images_router = routers.SimpleRouter()
images_router.register(r'stores/applications/(?P<application_pk>\d+)/images',
                       StoreApplicationImageViewSet)
