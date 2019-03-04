from djmoney.money import Money
from rest_framework import serializers

from goods.models import Good, GoodsCategory, GoodSpecifications
from stores.api.v1.serializers import SimpleStoreSerializer


class GoodSpecificationsSerializer(serializers.ModelSerializer):
    color = serializers.ReadOnlyField(source='color.definition')
    size = serializers.ReadOnlyField(source='size.definition')

    class Meta:
        model = GoodSpecifications
        fields = ['color', 'size']


class GoodSerializer(serializers.ModelSerializer):
    categories_ids = serializers.ListField(read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    price = serializers.FloatField(source='price.amount')
    price_currency = serializers.CharField(source='price.currency', default='UAH')
    seller_info = SimpleStoreSerializer(read_only=True, source='seller')
    specifications = GoodSpecificationsSerializer(read_only=True)

    class Meta:
        model = Good
        fields = ['id', 'name', 'description', 'category', 'price', 'price_currency',
                  'categories_ids', 'user', 'seller_info', 'specifications']

    def validate(self, validated_data):
        user = validated_data.pop('user')
        if not validated_data.get('seller'):
            seller = user.store
            validated_data['seller'] = seller
        validated_data['price'] = Money(**validated_data['price'])
        return validated_data

    def get_field_names(self, declared_fields, info):
        fields = super().get_field_names(declared_fields, info)
        if self.context['request'].user.is_staff:
            fields.append('seller')
        return fields


class GoodsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodsCategory
        fields = ['slug', 'name']
