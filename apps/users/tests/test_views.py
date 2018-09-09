import json
from unittest.mock import patch

from django.test import RequestFactory, TestCase
from django.urls import reverse

from rest_framework.test import APIClient, APITestCase

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
        with patch('users.views.django_views.messages.success') as messages:
            response = ConfirmEmail.as_view()(request)
            self.assertEqual(response.status_code, 302)
            messages.assert_called_once()

        user = HoloUser.objects.get(pk=self.user.pk)
        self.assertTrue(user.email_confirmed)

    def test_confirm_email_without_token(self):
        request = self.factory.get(reverse('confirm-email'))
        request.user = self.user
        with patch('users.views.django_views.messages.warning') as messages:
            response = ConfirmEmail.as_view()(request)
            self.assertEqual(response.status_code, 302)
            messages.assert_called_once()

        user = HoloUser.objects.get(pk=self.user.pk)
        self.assertFalse(user.email_confirmed)

    def test_confirm_email_wrong_token(self):
        request = self.factory.get(reverse('confirm-email') + '?token=foo')
        request.user = self.user
        with patch('users.views.django_views.messages.warning') as messages:
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
        with patch('users.views.django_views.messages.info') as messages:
            response = ConfirmEmail.as_view()(request)
            self.assertEqual(response.status_code, 302)
            messages.assert_called_once()

        user = HoloUser.objects.get(pk=self.user.pk)
        self.assertTrue(user.email_confirmed)


class TestUserApi(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = HoloUserFactory()
        self.user.set_password('12345')
        self.user.save()

    def test_login(self):
        data = {'username': self.user.email, 'password': '12345'}
        response = self.client.post(reverse('holouser-login'), data, format='json')
        self.assertEqual(response.status_code, 200)
        parsed_response = json.loads(response.content)
        self.assertEqual(parsed_response['email'], self.user.email)

    def test_login_fail(self):
        data = {'username': self.user.email, 'password': 'foo'}
        response = self.client.post(reverse('holouser-login'), data, format='json')
        self.assertEqual(response.status_code, 403)

    def test_email_exists(self):
        response = self.client.get(reverse('holouser-check-email') + f'?email={self.user.email}')
        self.assertEqual(response.status_code, 200)
        parsed_response = json.loads(response.content)
        self.assertTrue(parsed_response['email_exists'])

    def test_email_doesnt_exist(self):
        response = self.client.get(reverse('holouser-check-email') + '?email=foo@example.com')
        self.assertEqual(response.status_code, 200)
        parsed_response = json.loads(response.content)
        self.assertFalse(parsed_response['email_exists'])
