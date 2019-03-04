import json

from django.urls import reverse

from rest_framework.test import APIClient, APITestCase

from .factories import HoloUserFactory


class TestUserApi(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = HoloUserFactory()
        self.user.set_password('12345')
        self.user.save()

    def test_login(self):
        data = {'username': self.user.email, 'password': '12345'}
        response = self.client.post(reverse('v1:holouser-login'), data, format='json')
        self.assertEqual(response.status_code, 200)
        parsed_response = json.loads(response.content)
        self.assertEqual(parsed_response['email'], self.user.email)

    def test_login_fail(self):
        data = {'username': self.user.email, 'password': 'foo'}
        response = self.client.post(reverse('v1:holouser-login'), data, format='json')
        self.assertEqual(response.status_code, 403)
