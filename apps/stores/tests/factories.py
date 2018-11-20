import factory

from stores.models.store import Store
from users.tests.factories import HoloUserFactory


class StoreFactory(factory.DjangoModelFactory):
    class Meta:
        model = Store

    user = factory.SubFactory(HoloUserFactory)
    store_name = factory.Sequence(lambda n: f'Store {n}')
