from unittest.mock import patch

from django.test import TestCase

from .factories import HoloUserFactory, SubscriptionFactory


class TestHoloUser(TestCase):
    def setUp(self):
        self.user = HoloUserFactory(first_name='Jane', last_name='Doe')

    def test_short_name(self):
        self.assertEqual(self.user.get_short_name(), 'Jane')

    def test_full_name(self):
        self.assertEqual(self.user.get_full_name(), 'Jane Doe')

    def test_repr(self):
        self.assertEqual(str(self.user), f'Jane Doe {self.user.email}')


class TestSubscription(TestCase):
    def test_repr(self):
        sub = SubscriptionFactory(email='jdoe@holo-apollo.art')
        self.assertEqual(str(sub), 'jdoe@holo-apollo.art: subscribed')
        sub.subscribed = False
        sub.save()
        self.assertEqual(str(sub), 'jdoe@holo-apollo.art: not subscribed')

    @patch('users.models.send_email_to_managers.delay')
    @patch('users.models.send_template_email.delay')
    def test_email_on_save(self, mock_send, mock_send_managers):
        SubscriptionFactory()
        mock_send.assert_called_once()
        mock_send_managers.assert_called_once()

    @patch('users.models.send_email_to_managers.delay')
    @patch('users.models.send_template_email.delay')
    def test_no_email_on_next_save(self, mock_send, mock_send_managers):
        sub = SubscriptionFactory()
        mock_send.assert_called_once()
        mock_send_managers.assert_called_once()
        mock_send.reset_mock()
        mock_send_managers.reset_mock()
        sub.save()
        self.assertFalse(mock_send.called)
        self.assertFalse(mock_send_managers.called)

    @patch('users.models.send_email_to_managers.delay')
    @patch('users.models.send_template_email.delay')
    def test_email_again_on_next_save(self, mock_send, mock_send_managers):
        sub = SubscriptionFactory()
        mock_send.assert_called_once()
        mock_send_managers.assert_called_once()
        mock_send.reset_mock()
        mock_send_managers.reset_mock()
        sub.save()
        self.assertFalse(mock_send.called)
        self.assertFalse(mock_send_managers.called)
        sub.subscribed = False
        sub.save()
        sub.subscribed = True
        sub.save()
        mock_send.assert_called_once()
        mock_send_managers.assert_called_once()

    @patch('users.models.send_email_to_managers.delay')
    @patch('users.models.send_template_email.delay')
    def test_no_email_without_subscription(self, mock_send, mock_send_managers):
        SubscriptionFactory(subscribed=False)
        self.assertFalse(mock_send.called)
        self.assertFalse(mock_send_managers.called)
