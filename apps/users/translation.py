from modeltranslation.translator import register, TranslationOptions

from .models import HoloUser


@register(HoloUser)
class HoloUserTranslationOptions(TranslationOptions):
    fields = ('first_name', 'last_name',)
