from django.urls import path
from . import views

urlpatterns = [
    path('get_reason/', views.get_reason, name="get_reason"),
    path('', views.index, name="index")
]