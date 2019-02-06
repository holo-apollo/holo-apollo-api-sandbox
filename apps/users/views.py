import uuid

from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.tokens import default_token_generator
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.http import urlsafe_base64_decode
from django.utils.translation import gettext as _
from django.views import View
from django.views.generic import TemplateView

UserModel = get_user_model()


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


class PasswordResetView(TemplateView):
    template_name = 'registration/password_reset_form.html'


class PasswordResetConfirmView(TemplateView):
    template_name = 'registration/password_reset_confirm.html'

    def get_user(self, uidb64):
        try:
            # urlsafe_base64_decode() decodes to bytestring
            uid = urlsafe_base64_decode(uidb64).decode()
            user = UserModel._default_manager.get(pk=uid)
        except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
            user = None
        return user

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        validlink = False
        user = self.get_user(self.request.GET.get('uid'))
        if user is not None:
            token = self.request.GET.get('token')
            if default_token_generator.check_token(user, token):
                validlink = True
        context['validlink'] = validlink
        return context


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
