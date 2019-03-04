from modeltranslation.translator import TranslationOptions, register

from .models import Color, Size


@register(Color)
class ColorTranslationOptions(TranslationOptions):
    fields = ('definition',)


@register(Size)
class SizeTranslationOptions(TranslationOptions):
    fields = ('definition',)
