from django.test import TestCase

from .factories import GoodsCategoryFactory, GoodFactory


class TestGoodsCategory(TestCase):
    def test_categories_chain(self):
        category = GoodsCategoryFactory()
        subcategory1 = GoodsCategoryFactory(parent_category=category)
        subcategory2 = GoodsCategoryFactory(parent_category=category)
        subsubcategory11 = GoodsCategoryFactory(parent_category=subcategory1)

        self.assertTupleEqual(category.categories_chain(), (category,))
        self.assertTupleEqual(
            subcategory1.categories_chain(),
            (category, subcategory1)
        )
        self.assertTupleEqual(
            subcategory2.categories_chain(),
            (category, subcategory2)
        )
        self.assertTupleEqual(
            subsubcategory11.categories_chain(),
            (category, subcategory1, subsubcategory11)
        )

    def test_all_goods(self):
        category = GoodsCategoryFactory()
        subcategory1 = GoodsCategoryFactory(parent_category=category)
        subcategory2 = GoodsCategoryFactory(parent_category=category)
        subsubcategory11 = GoodsCategoryFactory(parent_category=subcategory1)

        GoodFactory(category=category)
        good2 = GoodFactory(category=subcategory1)
        good3 = GoodFactory(category=subcategory1)
        good4 = GoodFactory(category=subcategory2)
        good5 = GoodFactory(category=subsubcategory11)

        self.assertEqual(category.all_goods().count(), 5)
        self.assertListEqual(
            list(subcategory1.all_goods().values_list('id', flat=True)),
            [good2.id, good3.id, good5.id]
        )
        self.assertListEqual(
            list(subcategory2.all_goods().values_list('id', flat=True)),
            [good4.id]
        )
        self.assertListEqual(
            list(subsubcategory11.all_goods().values_list('id', flat=True)),
            [good5.id]
        )
