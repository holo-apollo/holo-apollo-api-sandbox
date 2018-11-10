from django.db import models

from .store_application import StoreApplication


def upload_path(instance, filename):
    return f'{instance.application.instagram_name}/{filename}'


class StoreApplicationImage(models.Model):
    application = models.ForeignKey(
        StoreApplication,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(upload_to=upload_path)
