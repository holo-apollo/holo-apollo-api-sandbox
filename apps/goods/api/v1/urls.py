from rest_framework import routers

from .search.good_api import GoodDocumentViewSet

router = routers.SimpleRouter()
router.register(r'search/goods', GoodDocumentViewSet, base_name='gooddoc')
