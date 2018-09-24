from rest_framework import serializers

from stores.models import Store


class StoreSerializer(serializers.ModelSerializer):
    store_id = serializers.IntegerField(source='id')

    class Meta:
        model = Store
        fields = ['store_id', 'store_name', 'user']
