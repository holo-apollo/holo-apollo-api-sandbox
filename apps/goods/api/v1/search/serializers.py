from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from goods.documents import GoodDocument


class GoodDocumentSerializer(DocumentSerializer):
    class Meta:
        document = GoodDocument
        fields = ['id', 'name', 'name_en', 'name_ru', 'name_uk', 'description', 'description_en',
                  'description_ru', 'description_uk', 'categories', 'seller', 'price',
                  'price_currency', 'discount', 'availability',
                  'specifications', 'images']
