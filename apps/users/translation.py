from modeltranslation.translator import TranslationOptions, register

from .models import HoloUser


@register(HoloUser)
class HoloUserTranslationOptions(TranslationOptions):
    fields = ('first_name', 'last_name',)
