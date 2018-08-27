import factory

from stores.models import Store
from users.tests.factories import HoloUserFactory


class StoreFactory(factory.DjangoModelFactory):
    class Meta:
        model = Store

    user = factory.SubFactory(HoloUserFactory)
