from modeltranslation.translator import TranslationOptions, register

from .models import Good, GoodsCategory


@register(Good)
class GoodTranslationOptions(TranslationOptions):
    fields = ('name', 'description',)


@register(GoodsCategory)
class GoodsCategoryTranstaionOptions(TranslationOptions):
    fields = ('name',)
