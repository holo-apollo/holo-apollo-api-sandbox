from djmoney.money import Money
from rest_framework import serializers

from goods.models import Good
from stores.api.v1.serializers import StoreSerializer


class GoodSerializer(serializers.ModelSerializer):
    categories_ids = serializers.ListField(read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    price = serializers.FloatField(source='price.amount')
    price_currency = serializers.CharField(source='price.currency', default='UAH')
    seller_info = StoreSerializer(read_only=True, source='seller')

    class Meta:
        model = Good
        fields = ['id', 'name', 'description', 'category', 'price', 'price_currency',
                  'categories_ids', 'user', 'seller_info']

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
