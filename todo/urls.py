from django.urls import path
from . import views

urlpatterns = [
    path('', views.ToDoView.as_view(), name='index'),
    path('add/', views.add, name='todo-add'),
    path('<int:id>/', views.details, name="todo-details"),
    path('<int:id>/delete/', views.delete, name="todo-delete"),
    path('<int:id>/update/', views.update, name="todo-update"),
    path('<int:id>/change-status/', views.change_status, name="todo-change-status"),

]
