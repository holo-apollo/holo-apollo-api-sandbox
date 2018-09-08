from modeltranslation.translator import register, TranslationOptions

from .models import Good, GoodsCategory


@register(Good)
class GoodTranslationOptions(TranslationOptions):
    fields = ('name', 'description',)


@register(GoodsCategory)
class GoodsCategoryTranstaionOptions(TranslationOptions):
    fields = ('name',)
