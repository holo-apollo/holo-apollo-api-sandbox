from django.utils.translation import ugettext as _

from rest_framework import serializers

from stores.models.store import Store
from stores.models.store_application import StoreApplication


class StoreSerializer(serializers.ModelSerializer):
    store_id = serializers.IntegerField(source='id')

    class Meta:
        model = Store
        fields = ['store_id', 'store_name', 'user']


class StoreApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreApplication
        fields = ('name', 'email', 'instagram_name', 'category', 'selling_goods',
                  'goods_description', 'philosophy', 'images', 'data_usage_agreement')

    def create(self, validated_data):
        # TODO: create images
        return super().create(validated_data)

    def validate_data_usage_agreement(self, value):
        if value is False:
            raise serializers.ValidationError(
                _('You must allow your data usage to create application')
            )
        return value
