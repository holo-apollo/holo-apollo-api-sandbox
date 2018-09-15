from unittest.mock import patch

from django.test import RequestFactory, TestCase
from django.urls import reverse

from users.models import HoloUser
from users.views import ConfirmEmail
from .factories import HoloUserFactory


class TestConfirmEmail(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = HoloUserFactory()

    def test_confirm_email(self):
        request = self.factory.get(reverse('confirm-email') +
                                   f'?token={self.user.email_confirm_token}')
        request.user = self.user
        with patch('users.views.messages.success') as messages:
            response = ConfirmEmail.as_view()(request)
            self.assertEqual(response.status_code, 302)
            messages.assert_called_once()

        user = HoloUser.objects.get(pk=self.user.pk)
        self.assertTrue(user.email_confirmed)

    def test_confirm_email_without_token(self):
        request = self.factory.get(reverse('confirm-email'))
        request.user = self.user
        with patch('users.views.messages.warning') as messages:
            response = ConfirmEmail.as_view()(request)
            self.assertEqual(response.status_code, 302)
            messages.assert_called_once()

        user = HoloUser.objects.get(pk=self.user.pk)
        self.assertFalse(user.email_confirmed)

    def test_confirm_email_wrong_token(self):
        request = self.factory.get(reverse('confirm-email') + '?token=foo')
        request.user = self.user
        with patch('users.views.messages.warning') as messages:
            response = ConfirmEmail.as_view()(request)
            self.assertEqual(response.status_code, 302)
            messages.assert_called_once()

        user = HoloUser.objects.get(pk=self.user.pk)
        self.assertFalse(user.email_confirmed)

    def test_confirm_email_already_confirmed(self):
        self.user.email_confirmed = True
        self.user.save()
        request = self.factory.get(reverse('confirm-email') +
                                   f'?token={self.user.email_confirm_token}')
        request.user = self.user
        with patch('users.views.messages.info') as messages:
            response = ConfirmEmail.as_view()(request)
            self.assertEqual(response.status_code, 302)
            messages.assert_called_once()

        user = HoloUser.objects.get(pk=self.user.pk)
        self.assertTrue(user.email_confirmed)
