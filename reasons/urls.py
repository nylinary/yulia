from django.urls import path
from . import views

urlpatterns = [
    path('ajax/get_reason/', views.ajax_get_reason, name="ajax_get_reason"),
    path('', views.index, name="index")
]