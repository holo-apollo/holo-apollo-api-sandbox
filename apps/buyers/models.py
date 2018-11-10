from django.contrib.auth import get_user_model
from django.db import models

from model_utils.models import TimeStampedModel

UserModel = get_user_model()


class Buyer(TimeStampedModel):
    user = models.OneToOneField(UserModel, related_name='_buyer', on_delete=models.CASCADE)

    def __str__(self):
        return f'Buyer: {self.user}'
