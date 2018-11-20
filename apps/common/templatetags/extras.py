from django import template
from django.utils import timezone

register = template.Library()


@register.filter
def to_date(value):
    try:
        return timezone.datetime.strptime(value, '%Y-%m-%d')
    except ValueError:
        return ''
