import factory

from stores.models.store import Store
from stores.models.store_application import StoreApplication
from users.tests.factories import HoloUserFactory


class StoreFactory(factory.DjangoModelFactory):
    class Meta:
        model = Store

    user = factory.SubFactory(HoloUserFactory)
    store_name = factory.Sequence(lambda n: f'Store {n}')


class StoreApplicationFactory(factory.DjangoModelFactory):
    class Meta:
        model = StoreApplication

    name = "Jane Doe"
    email = factory.Sequence(lambda n: f'store-{n}@ha.rt')
    instagram_name = factory.Sequence(lambda n: f'@store-{n}')
    category = StoreApplication.OTHER
    selling_goods = 'Goods'
    goods_description = 'Goods' * 20
    philosophy = 'Goods' * 20
    data_usage_agreement = True
