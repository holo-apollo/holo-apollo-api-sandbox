from unittest.mock import patch

from django.test import TestCase

from common import tasks


class TestTasks(TestCase):
    @patch('django.core.mail.EmailMultiAlternatives.send')
    def test_send_email(self, mock_send):
        tasks.send_email('someone@example.com', 'Subj', 'Message')
        mock_send.assert_called_once()

    @patch('django.core.mail.EmailMultiAlternatives.send')
    def test_broadcast_email(self, mock_send):
        tasks.broadcast_email(['1@example.com', '2@example.com'], 'Subj', 'Message')
        mock_send.assert_called_once()
