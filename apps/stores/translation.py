from modeltranslation.translator import TranslationOptions, register

from .models import Store


@register(Store)
class StoreTranslationOptions(TranslationOptions):
    fields = ('store_name',)
