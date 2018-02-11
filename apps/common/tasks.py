import logging

from django.core.mail import EmailMultiAlternatives

from celery import shared_task

logger = logging.getLogger(f'holo.{__name__}')


@shared_task
def add(x, y):
    """ Test task. """
    return x + y


@shared_task
def send_email(recipient, subject, text_content, html_content=None):
    msg = EmailMultiAlternatives(subject, text_content, to=[recipient])
    if html_content:
        msg.attach_alternative(html_content, "text/html")
    logger.info('Sending email')
    msg.send()


@shared_task
def broadcast_email(recipients, subject, text_content, html_content=None):
    msg = EmailMultiAlternatives(subject, text_content, bcc=recipients)
    if html_content:
        msg.attach_alternative(html_content, "text/html")
    logger.info('Sending emails')
    msg.send()
