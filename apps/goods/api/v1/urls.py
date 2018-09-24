from rest_framework import routers

from .good_api import GoodViewSet
from .search.good_api import GoodDocumentViewSet

router = routers.SimpleRouter()
router.register(r'goods', GoodViewSet)
router.register(r'search/goods', GoodDocumentViewSet, base_name='gooddoc')
