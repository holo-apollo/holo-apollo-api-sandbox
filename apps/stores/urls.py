from django.urls import path

from . import views

app_name = 'stores'

urlpatterns = [
    path('application/create/', views.ApplicationCreateView.as_view(),
         name='application-create'),
    path('application/success/', views.ApplicationSuccessView.as_view(),
         name='application-success')
]
