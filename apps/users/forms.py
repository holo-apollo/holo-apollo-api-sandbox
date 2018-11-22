from django.contrib.auth.forms import PasswordResetForm
from django.utils.translation import get_language

from common.tasks import send_template_email


class PasswordResetDelayForm(PasswordResetForm):
    def send_mail(self, subject_template_name, email_template_name,
                  context, from_email, to_email, html_email_template_name=None):
        send_template_email.delay(to_email, subject_template_name, email_template_name,
                                  context, html_email_template_name, get_language())
