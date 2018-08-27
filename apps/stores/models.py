from django.contrib.auth import get_user_model
from django.db import models

from model_utils.models import TimeStampedModel

UserModel = get_user_model()


class Store(TimeStampedModel):
    store_name = models.CharField(max_length=30, unique=True)
    user = models.OneToOneField(UserModel, related_name='_store', on_delete=models.CASCADE)

    def __str__(self):
        return f'Store: {self.user}'
