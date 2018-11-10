from django.contrib.auth.forms import PasswordResetForm
from django.template import loader

from common.tasks import send_email


class PasswordResetDelayForm(PasswordResetForm):
    def send_mail(self, subject_template_name, email_template_name,
                  context, from_email, to_email, html_email_template_name=None):
        subject = loader.render_to_string(subject_template_name, context)
        # Email subject *must not* contain newlines
        subject = ''.join(subject.splitlines())
        body = loader.render_to_string(email_template_name, context)

        if html_email_template_name is not None:
            html_email = loader.render_to_string(html_email_template_name, context)
        else:
            html_email = None

        send_email.delay(to_email, subject, body, html_email)
