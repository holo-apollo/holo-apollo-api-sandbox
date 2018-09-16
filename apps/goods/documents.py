from django_elasticsearch_dsl import DocType, Index, fields

from goods.models import Good, GoodsCategory
from stores.models import Store
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
        'raw': fields.KeywordField()
    })
    description = fields.StringField(fields={
        'raw': fields.KeywordField()
    })
    categories_ids = fields.IntegerField()
    categories = fields.NestedField(properties={
        'id': fields.IntegerField(),
        'name': fields.TextField()
    })
    seller = fields.ObjectField(properties={
        'store_id': fields.IntegerField(attr='id'),
        'user_id': fields.IntegerField(attr='user.id'),
        'store_name': fields.TextField(),
        'email': fields.TextField(attr='user.email'),
        'phone': fields.TextField(attr='user.phone')
    })
    price = fields.FloatField(attr='price.amount')
    price_currency = fields.KeywordField()
    created = fields.DateField()
    modified = fields.DateField()

    class Meta:
        model = Good
        related_models = [
            GoodsCategory,
            HoloUser,
            Store
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
