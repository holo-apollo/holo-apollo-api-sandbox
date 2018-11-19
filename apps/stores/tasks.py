import os

from django.core.files import File

from celery import shared_task
from celery.utils.log import get_task_logger

from stores.models.store_application_image import StoreApplicationImage

logger = get_task_logger(__name__)


@shared_task
def save_application_image(application_id, path, filename=None):
    with open(path, 'rb') as f:
        image = File(f, filename)
        StoreApplicationImage.objects.create(application_id=application_id, image=image)
    os.remove(path)
