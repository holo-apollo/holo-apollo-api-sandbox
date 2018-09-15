from rest_framework import serializers

from goods.models import Good


class GoodSerializer(serializers.ModelSerializer):
    categories_ids = serializers.ListField(read_only=True)

    class Meta:
        model = Good
        fields = ['id', 'name', 'description', 'category', 'seller', 'price', 'price_currency',
                  'categories_ids']
