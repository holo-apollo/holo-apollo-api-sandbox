from rest_auth.serializers import PasswordResetSerializer
from rest_framework import serializers

from .forms import PasswordResetDelayForm
from .models import HoloUser, Subscription


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('email', 'subscribed',)


class HoloUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = HoloUser
        fields = ('username', 'first_name', 'last_name', 'email', 'phone', 'password')

    def create(self, validated_data):
        user = HoloUser.objects.create_user(
            validated_data.get('email'),
            validated_data.get('password'),
            username=validated_data.get('username'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone')
        )
        return user


class CustomPasswordResetSerializer(PasswordResetSerializer):
    password_reset_form_class = PasswordResetDelayForm
