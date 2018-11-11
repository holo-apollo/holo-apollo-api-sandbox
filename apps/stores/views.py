from django.urls import reverse_lazy
from django.views.generic import CreateView, TemplateView

from .forms import StoreApplicationForm
from .models.store_application import StoreApplication


class ApplicationCreateView(CreateView):
    model = StoreApplication
    form_class = StoreApplicationForm
    template_name = 'stores/application_create.html'
    success_url = reverse_lazy('stores:application-success')


class ApplicationSuccessView(TemplateView):
    template_name = 'stores/application_success.html'
