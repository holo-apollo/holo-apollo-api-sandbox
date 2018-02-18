import uuid

from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views import View


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
                _('Looks like you\'ve followed the wrong link for email verification')
            )
        elif not instance.email_confirmed:
            instance.email_confirmed = True
            instance.save()
            messages.success(request, _('Your email is verified successfully!'))
        else:
            messages.info(request, _('Your email is already verified'))

        return HttpResponseRedirect(reverse('index'))
