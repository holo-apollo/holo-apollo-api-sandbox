from django.conf import settings
from django.shortcuts import render


def index(request):
    return render(request, 'common/index.html')


def about(request):
    context = {'production': settings.PRODUCTION}
    return render(request, 'common/landing.html', context)
