from django.contrib import admin
from django.urls import include, path

from rest_framework import routers
from rest_framework import urls as drf_urls
from rest_framework.documentation import include_docs_urls

from common.api.v1.views import SignS3
from goods.api.v1.urls import router as goods_app_router_v1
from stores.api.v1.urls import router as stores_router_v1
from users.api.v1.urls import router as users_app_router_v1

router_v1 = routers.DefaultRouter()
router_v1.registry.extend(goods_app_router_v1.registry)
router_v1.registry.extend(stores_router_v1.registry)
router_v1.registry.extend(users_app_router_v1.registry)

api_patterns = [
    path('v1/sign-s3', SignS3.as_view(), name='sign_s3'),
    path('v1/', include((router_v1.urls, 'api_v1'), namespace='v1'))
]

urlpatterns = [
    # Django
    path('admin/', admin.site.urls),

    # DRF
    path('api-auth/', include(drf_urls)),
    path('api/docs/', include_docs_urls(title='Holo Apollo API', public=False)),
    path('api/', include(api_patterns)),

    # Apps
    path('', include('stores.urls', namespace='stores')),
]
