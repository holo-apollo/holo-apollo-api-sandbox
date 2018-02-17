import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.template.loader import get_template
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from model_utils.models import TimeStampedModel

from common.fields import PhoneField
from common.tasks import send_email
from .managers import HoloUserManager


def avatar_upload_path(self, filename):
    return f'avatars/{self.id}/{filename}'


class HoloUser(AbstractBaseUser, PermissionsMixin):
    objects = HoloUserManager()

    username = models.CharField(
        max_length=30,
        unique=True,
        error_messages={
            'unique': _('That username is already taken.')
        }
    )
    first_name = models.CharField(max_length=30, blank=True, default='')
    last_name = models.CharField(max_length=30, blank=True, default='')

    email = models.EmailField(
        max_length=254,
        unique=True,
        error_messages={
            'unique': _('That email address is already taken.')
        }
    )
    phone = PhoneField(
        unique=True,
        error_messages={
            'unique': _('That phone number is already taken.')
        }
    )

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(auto_now=True)
    avatar = models.ImageField(null=True, blank=True, upload_to=avatar_upload_path)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone']

    def __str__(self):
        return f'{self.get_full_name()} {self.email}'

    def get_short_name(self):
        return self.first_name

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'
    get_full_name.short_description = _('Full name')


class Subscription(TimeStampedModel):
    email = models.EmailField(
        max_length=254,
        unique=True,
        error_messages={
            'unique': _('That email address is already subscribed.')
        }
    )
    subscribed = models.BooleanField(default=True)
    edit_token = models.UUIDField(default=uuid.uuid4, editable=False)

    def save(self, **kwargs):
        previously_subscribed = False
        if self.pk:
            prev_version = Subscription.objects.get(pk=self.pk)
            previously_subscribed = prev_version.subscribed
        super(Subscription, self).save(**kwargs)
        if not previously_subscribed and self.subscribed:
            text_template = get_template('emails/subscription.txt')
            text_content = text_template.render()
            html_template = get_template('emails/subscription.html')
            html_content = html_template.render({
                'token': self.edit_token,
                'host': settings.SITE_URL
            })
            send_email.delay(
                self.email,
                _('Holo-Apollo Subscription'),
                text_content,
                html_content
            )

    def __str__(self):
        subscribed = 'subscribed' if self.subscribed else 'not subscribed'
        return f'{self.email}: {subscribed}'
