from django_elasticsearch_dsl import DocType, Index, fields

from goods.models import Good, GoodImage, GoodsCategory, GoodSpecifications
from stores.models.store import Store
from users.models import HoloUser

good = Index('goods')
good.settings(
    number_of_shards=1,
    number_of_replicas=0
)


@good.doc_type
class GoodDocument(DocType):
    id = fields.IntegerField(attr='id')
    name = fields.StringField(fields={
        'raw': fields.KeywordField(),
    })
    name_en = fields.StringField(analyzer='english')
    name_ru = fields.StringField(analyzer='russian')
    name_uk = fields.StringField()
    description = fields.StringField(fields={
        'raw': fields.KeywordField(),
    })
    description_en = fields.StringField(analyzer='english')
    description_ru = fields.StringField(analyzer='russian')
    description_uk = fields.StringField()
    category = fields.ObjectField(properties={
        'id': fields.IntegerField(),
        'slug': fields.KeywordField(),
        'name': fields.StringField(fields={
            'raw': fields.KeywordField(),
        }),
        'name_en': fields.StringField(analyzer='english'),
        'name_ru': fields.StringField(analyzer='russian'),
        'name_uk': fields.StringField(),
        'is_main': fields.BooleanField(),
    })
    categories_ids = fields.IntegerField()
    categories_names = fields.StringField(fields={
        'raw': fields.KeywordField(),
    })
    categories = fields.NestedField(properties={
        'id': fields.IntegerField(),
        'slug': fields.KeywordField(),
        'name': fields.StringField(fields={
            'raw': fields.KeywordField(),
        }),
        'name_en': fields.StringField(analyzer='english'),
        'name_ru': fields.StringField(analyzer='russian'),
        'name_uk': fields.StringField(),
        'is_main': fields.BooleanField(),
    })
    seller = fields.ObjectField(properties={
        'id': fields.IntegerField(),
        'store_name': fields.StringField(fields={
            'raw': fields.KeywordField(),
        }),
        'store_name_en': fields.StringField(analyzer='english'),
        'store_name_ru': fields.StringField(analyzer='russian'),
        'store_name_uk': fields.StringField(),
        'description': fields.StringField(fields={
            'raw': fields.KeywordField(),
        }),
        'description_en': fields.StringField(analyzer='english'),
        'description_ru': fields.StringField(analyzer='russian'),
        'description_uk': fields.StringField(),
        'location': fields.StringField(fields={
            'raw': fields.KeywordField(),
        }),
        'location_en': fields.StringField(analyzer='english'),
        'location_ru': fields.StringField(analyzer='russian'),
        'location_uk': fields.StringField(),
        'goods_count': fields.IntegerField(),
        'rating': fields.FloatField(),
    })
    price = fields.FloatField(attr='price.amount')
    price_currency = fields.KeywordField()
    discount = fields.IntegerField()
    availability = fields.TextField()
    specifications = fields.ObjectField(properties={
        'color': fields.StringField(attr='color.definition', fields={
            'raw': fields.KeywordField(),
        }),
        'color_en': fields.StringField(attr='color.definition_en', analyzer='english'),
        'color_ru': fields.StringField(attr='color.definition_ru', analyzer='russian'),
        'color_uk': fields.StringField(attr='color.definition_uk'),
        'size': fields.StringField(attr='size.definition', fields={
            'raw': fields.KeywordField(),
        }),
        'size_en': fields.StringField(attr='size.definition_en', analyzer='english'),
        'size_ru': fields.StringField(attr='size.definition_ru', analyzer='russian'),
        'size_uk': fields.StringField(attr='size.definition_uk'),
    })
    images = fields.NestedField(properties={
        'image_url': fields.KeywordField(),
    })
    created = fields.DateField()
    modified = fields.DateField()

    class Meta:
        model = Good
        related_models = [
            GoodsCategory,
            HoloUser,
            Store,
            GoodSpecifications,
            GoodImage,
        ]

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.select_related('category', 'seller')

    def get_instances_from_related(self, related_instance):
        if isinstance(related_instance, GoodsCategory):
            return related_instance.all_goods()
        if isinstance(related_instance, HoloUser):
            store = related_instance.store
            if store:
                return store.goods.all()
        if isinstance(related_instance, Store):
            return related_instance.goods.all()
        if isinstance(related_instance, GoodSpecifications):
            return related_instance.good
        if isinstance(related_instance, GoodImage):
            return related_instance.good
