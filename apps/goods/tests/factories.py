import factory

from goods.models import Good, GoodsCategory


class GoodsCategoryFactory(factory.DjangoModelFactory):
    class Meta:
        model = GoodsCategory

    name = factory.Sequence(lambda n: f'Category {n}')


class GoodFactory(factory.DjangoModelFactory):
    class Meta:
        model = Good

    name = factory.Sequence(lambda n: f'Good {n}')
    category = factory.SubFactory(GoodsCategoryFactory)
