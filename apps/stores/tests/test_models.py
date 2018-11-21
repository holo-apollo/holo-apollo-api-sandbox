from datetime import date
from unittest.mock import patch

from django.test import TestCase

from .factories import StoreApplicationFactory


class TestStoreApplication(TestCase):
    def test_setting_pub_date(self):
        StoreApplicationFactory(pub_date=date(year=2018, month=11, day=21))
        application = StoreApplicationFactory()
        self.assertEqual(application.pub_date, date(year=2018, month=11, day=23))

    @patch('stores.models.store_application.send_email_to_managers.delay')
    def test_sending_email_to_managers(self, mock_send_managers):
        application = StoreApplicationFactory()
        mock_send_managers.assert_called_once()
        mock_send_managers.reset_mock()
        application.save()
        self.assertFalse(mock_send_managers.called)
