from django.views.generic import TemplateView


class ApplicationCreateView(TemplateView):
    template_name = 'stores/application_create.html'


class ApplicationSuccessView(TemplateView):
    template_name = 'stores/application_success.html'
