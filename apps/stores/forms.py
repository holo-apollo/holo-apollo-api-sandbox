from django import forms
from django.utils.translation import ugettext as _

from .models import StoreApplication, StoreApplicationImage

MIN_FILES = 5
MAX_FILES = 30
MAX_SIZE_MB = 150
MAX_SIZE = MAX_SIZE_MB * 1024 * 1024  # 150Mb


class StoreApplicationForm(forms.ModelForm):
    images = forms.ImageField(widget=forms.FileInput(attrs={'multiple': True}), required=True)

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
            raise forms.ValidationError(_('You must agree to your data usage'))
        return data
