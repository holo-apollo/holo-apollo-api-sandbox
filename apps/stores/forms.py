from django import forms
from django.utils.translation import ugettext_lazy as _

from common.forms import TextAreaWithCounter
from .models.store_application import StoreApplication
from .models.store_application_image import StoreApplicationImage

MIN_FILES = 5
MAX_FILES = 30
MAX_SIZE_MB = 150
MAX_SIZE = MAX_SIZE_MB * 1024 * 1024  # 150Mb


class StoreApplicationForm(forms.ModelForm):
    name = forms.CharField(
        max_length=61,
        label=_('What is your name?'),
        widget=forms.TextInput(attrs={
            'placeholder': _('What is your name?')
        })
    )
    email = forms.EmailField(
        max_length=254,
        label=_('Email to reach you out'),
        widget=forms.EmailInput(attrs={
            'placeholder': _('Email to reach you out')
        })
    )
    instagram_name = forms.CharField(
        max_length=254,
        label=_('@Name in Instagram'),
        widget=forms.TextInput(attrs={
            'placeholder': _('@Name in Instagram')
        })
    )
    selling_goods = forms.CharField(
        max_length=500,
        label=_("What's being sold in your store?"),
        widget=TextAreaWithCounter(attrs={
            'rows': 1,
            'placeholder': _("What is being sold in your store?")
        })
    )
    goods_description = forms.CharField(
        min_length=500,
        max_length=1000,
        label=_('Describe your goods (materials, technology, prices...)'),
        widget=TextAreaWithCounter(attrs={
            'rows': 1,
            'placeholder': _('Describe your goods (materials, technology, prices...)')
        })
    )
    philosophy = forms.CharField(
        min_length=500,
        max_length=1000,
        label=_('Philosophy behind your store'),
        widget=TextAreaWithCounter(attrs={
            'rows': 1,
            'placeholder': _('Philosophy behind your store')
        })
    )
    images = forms.ImageField(
        widget=forms.FileInput(attrs={'multiple': True}),
        required=True,
        label=_('Upload photos of your goods in good quality'),
        help_text=_('At least 5 and at most 30 photos, total size up to 150MB. '
                    'Photos will be used in a collage, therefore some of them should have minimal,'
                    ' neutral background.')
    )

    class Meta:
        model = StoreApplication
        fields = ['name', 'email', 'instagram_name', 'category', 'selling_goods',
                  'goods_description', 'philosophy', 'images', 'data_usage_agreement']

    def save(self, *args, **kwargs):
        instance = super().save(*args, **kwargs)
        if not instance.pk:
            instance.save()
        for file in self.files.getlist('images'):
            StoreApplicationImage.objects.create(
                application=instance,
                image=file
            )
        return instance

    def clean_images(self):
        if not self.instance.pk:
            files = self.files.getlist('images')
            if len(files) < MIN_FILES:
                raise forms.ValidationError(_('Choose at least %d files') % MIN_FILES)
            if len(files) > MAX_FILES:
                raise forms.ValidationError(_('Choose at most %d files') % MAX_FILES)
            total_size = sum(file.size for file in files)
            if total_size > MAX_SIZE:
                raise forms.ValidationError(
                    _('Maximum total size is %d MB. You uploaded %d MB') % (
                        MAX_SIZE_MB, total_size / (1024 * 1024))
                )
        return self.cleaned_data['images']

    def clean_data_usage_agreement(self):
        data = self.cleaned_data['data_usage_agreement']
        if data is False:
            raise forms.ValidationError(_('You must allow your data usage to create application'))
        return data

    def as_p(self):
        return self._html_output(
            normal_row='<p%(html_class_attr)s>%(field)s %(label)s%(help_text)s</p>',
            error_row='%s',
            row_ender='</p>',
            help_text_html=' <span class="helptext">%s</span>',
            errors_on_separate_row=True,
        )
