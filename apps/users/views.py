from django.urls import reverse_lazy
from django.views.generic import CreateView, TemplateView

from .forms import SubscriptionForm
from .models import Subscription


class SubscriptionSuccessView(TemplateView):
    template_name = 'users/subscription_success.html'


class SubscriptionCreateView(CreateView):
    model = Subscription
    form_class = SubscriptionForm
    template_name = 'users/subscription_form.html'
    success_url = reverse_lazy('users:subscribe-success')
