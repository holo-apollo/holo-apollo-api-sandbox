import factory

from goods.models import Good, GoodsCategory
from stores.tests.factories import StoreFactory


class GoodsCategoryFactory(factory.DjangoModelFactory):
    class Meta:
        model = GoodsCategory

    name = factory.Sequence(lambda n: f'Category {n}')
    slug = factory.LazyAttribute(lambda a: a.name.lower().replace(' ', '_'))


class GoodFactory(factory.DjangoModelFactory):
    class Meta:
        model = Good

    name = factory.Sequence(lambda n: f'Good {n}')
    category = factory.SubFactory(GoodsCategoryFactory)
    seller = factory.SubFactory(StoreFactory)
