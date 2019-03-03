from rest_framework import routers

from .search.good_api import GoodDocumentViewSet
from .views import GoodsCategoryViewSet, GoodViewSet

router = routers.SimpleRouter()
router.register(r'goods', GoodViewSet)
router.register(r'search/goods', GoodDocumentViewSet, base_name='gooddoc')
router.register(r'categories', GoodsCategoryViewSet)
