import uuid

from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.translation import ugettext as _
from django.views import View
from django.views.generic import TemplateView


class LoginView(TemplateView):
    template_name = 'users/login.html'

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse('index'))
        return super(LoginView, self).get(request, *args, **kwargs)


class SignupView(TemplateView):
    template_name = 'users/signup.html'

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse('index'))
        return super(SignupView, self).get(request, *args, **kwargs)


class ConfirmEmail(LoginRequiredMixin, View):
    def get(self, request):
        instance = request.user
        try:
            token = uuid.UUID(self.request.GET.get('token'))
        except (ValueError, TypeError):
            token = None

        if token != instance.email_confirm_token:
            messages.warning(
                request,
                _('We were unable to verify your email. '
                  'Make sure that you\'re logged in as a correct user and follow the link again')
            )
        elif not instance.email_confirmed:
            instance.email_confirmed = True
            instance.save()
            messages.success(request, _('Your email was verified successfully!'))
        else:
            messages.info(request, _('Your email is already verified'))

        return HttpResponseRedirect(reverse('index'))
