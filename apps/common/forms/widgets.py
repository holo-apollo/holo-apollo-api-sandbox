from django import forms
from django.utils.safestring import mark_safe


class ImageWidget(forms.FileInput):
    def render(self, name, value, attrs=None, renderer=None):
        output = []
        if value and hasattr(value, "url"):
            output.append(
                f'<a target="_blank" href="{value.url}">'
                f'<img src="{value.url}" style="height: 90px;" /></a><br />'
            )
        output.append(super().render(name, value, attrs, renderer))
        return mark_safe(''.join(output))


class TextAreaWithCounter(forms.Textarea):
    template_name = 'widgets/textarea.html'
