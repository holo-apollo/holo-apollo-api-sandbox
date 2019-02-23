from modeltranslation.translator import TranslationOptions, register

from .models.store import Store


@register(Store)
class StoreTranslationOptions(TranslationOptions):
    fields = ('store_name', 'description', 'location',)
