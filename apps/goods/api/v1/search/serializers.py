from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from goods.documents import GoodDocument


class GoodDocumentSerializer(DocumentSerializer):
    class Meta:
        document = GoodDocument
        fields = ['id', 'name', 'description', 'category_id', 'seller', 'price',
                  'price_currency', 'discount', 'availability',
                  'specifications', 'images']
