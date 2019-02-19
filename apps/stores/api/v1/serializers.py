from django.utils.translation import gettext_lazy as _

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from stores.models.store import Store
from stores.models.store_application import StoreApplication
from stores.models.store_application_image import StoreApplicationImage


class StoreSerializer(serializers.ModelSerializer):
    store_id = serializers.IntegerField(source='id')

    class Meta:
        model = Store
        fields = ['store_id', 'store_name', 'user']


class StoreApplicationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreApplicationImage
        fields = ('application', 'image',)


class StoreApplicationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[UniqueValidator(
        queryset=StoreApplication.objects.all(),
        message=_('An application with this email already exists')
    )])
    instagram_name = serializers.CharField(validators=[UniqueValidator(
        queryset=StoreApplication.objects.all(),
        message=_('An application with this Instagram name already exists')
    )])
    images = StoreApplicationImageSerializer(many=True, read_only=True)
    pub_date = serializers.ReadOnlyField()

    class Meta:
        model = StoreApplication
        fields = ('id', 'name', 'email', 'instagram_name', 'category', 'selling_goods',
                  'goods_description', 'philosophy', 'data_usage_agreement', 'pub_date', 'images')

    def validate_data_usage_agreement(self, value):
        if value is False:
            raise serializers.ValidationError(
                _('You must allow your data usage to create application')
            )
        return value


class StoreApplicationReadOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreApplication
        fields = ('id', 'name', 'email', 'instagram_name', 'category', 'selling_goods',
                  'goods_description', 'philosophy', 'data_usage_agreement', 'pub_date', 'images')
        read_only_fields = fields
