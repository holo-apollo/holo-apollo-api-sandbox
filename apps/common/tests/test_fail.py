from django.test import TestCase


class TestFailing(TestCase):
    def test_failing(self):
        self.assertEqual(2 + 2, 5)
