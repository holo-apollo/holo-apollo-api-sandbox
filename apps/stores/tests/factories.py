import factory

from stores.models.store import Store
from stores.models.store_application import StoreApplication
from users.tests.factories import HoloUserFactory


class StoreFactory(factory.DjangoModelFactory):
    class Meta:
        model = Store

    user = factory.SubFactory(HoloUserFactory)
    store_name = factory.Faker('company')


class StoreApplicationFactory(factory.DjangoModelFactory):
    class Meta:
        model = StoreApplication

    name = factory.Faker('name')
    email = factory.Faker('email')
    instagram_name = factory.Faker('word')
    category = StoreApplication.OTHER
    selling_goods = factory.Faker('text')
    goods_description = factory.Faker('text')
    philosophy = factory.Faker('text')
    data_usage_agreement = True
