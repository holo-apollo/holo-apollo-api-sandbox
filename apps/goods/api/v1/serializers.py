from djmoney.money import Money
from rest_framework import serializers

from goods.models import Good, GoodImage, GoodsCategory, GoodSpecifications
from stores.api.v1.serializers import StoreSerializer
from stores.models.store import Store


class GoodSpecificationsSerializer(serializers.ModelSerializer):
    color = serializers.ReadOnlyField(source='color.definition')
    size = serializers.ReadOnlyField(source='size.definition')

    class Meta:
        model = GoodSpecifications
        fields = ['color', 'size']


class GoodImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodImage
        fields = ['image_url']


class GoodsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodsCategory
        fields = ['id', 'slug', 'name', 'is_main']
        read_only_fields = ['is_main']


class GoodSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(
        source='category', queryset=GoodsCategory.objects.all(), write_only=True)
    categories = GoodsCategorySerializer(many=True, read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    price = serializers.FloatField(source='price.amount')
    price_currency = serializers.CharField(source='price.currency', default='UAH')
    seller_id = serializers.PrimaryKeyRelatedField(source='seller', write_only=True,
                                                   queryset=Store.objects.all())
    seller = StoreSerializer(read_only=True)
    specifications = GoodSpecificationsSerializer(read_only=True)
    images = GoodImageSerializer(many=True, read_only=True)

    class Meta:
        model = Good
        fields = ['id', 'name', 'description', 'category_id', 'categories', 'seller', 'price',
                  'price_currency', 'user', 'seller_id', 'specifications', 'discount',
                  'availability', 'images']

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
