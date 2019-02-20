from unittest import mock


class MockMixin:
    def setUp(self):
        super().setUp()
        self.patches = [
            mock.patch('django_elasticsearch_dsl.documents.bulk'),
            mock.patch('django_elasticsearch_dsl.documents.Search'),
        ]
        for p in self.patches:
            p.start()

    def tearDown(self):
        for p in self.patches:
            p.stop()
        super().tearDown()
