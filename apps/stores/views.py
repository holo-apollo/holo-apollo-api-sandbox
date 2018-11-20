from django.urls import reverse_lazy
from django.views.generic import CreateView, TemplateView

from .forms import StoreApplicationForm
from .models.store_application import StoreApplication


class ApplicationCreateView(CreateView):
    model = StoreApplication
    form_class = StoreApplicationForm
    template_name = 'stores/application_create.html'

    def get_success_url(self):
        base_url = reverse_lazy("stores:application-success")
        return f'{base_url}?pub_date={self.object.pub_date}'


class ApplicationSuccessView(TemplateView):
    template_name = 'stores/application_success.html'
