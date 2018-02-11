from django.conf import settings
from django.core.mail import EmailMultiAlternatives

from celery import shared_task


@shared_task
def add(x, y):
    """ Test task. """
    return x + y


@shared_task
def send_email(recipient, subject, text_content, html_content=None):
    from_email = settings.EMAIL_HOST_USER
    msg = EmailMultiAlternatives(subject, text_content, from_email, [recipient])
    if html_content:
        msg.attach_alternative(html_content, "text/html")
    msg.send()


@shared_task
def broadcast_email(recipients, subject, text_content, html_content=None):
    from_email = settings.EMAIL_HOST_USER
    msg = EmailMultiAlternatives(subject, text_content, from_email, bcc=recipients)
    if html_content:
        msg.attach_alternative(html_content, "text/html")
        msg.send()
