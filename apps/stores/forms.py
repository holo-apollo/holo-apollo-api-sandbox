from django import forms

from .models import StoreApplication, StoreApplicationImage


class StoreApplicationForm(forms.ModelForm):
    images = forms.ImageField(widget=forms.FileInput(attrs={'multiple': True}), required=False)

    class Meta:
        model = StoreApplication
        fields = ['name', 'email', 'instagram_name', 'category', 'selling_goods',
                  'goods_description', 'philosophy', 'data_usage_agreement', 'images']

    def save(self, *args, **kwargs):
        instance = super().save(*args, **kwargs)
        for file in self.files.getlist('images'):
            StoreApplicationImage.objects.create(
                application=instance,
                image=file
            )
        return instance
