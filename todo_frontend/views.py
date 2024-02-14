from django.shortcuts import render


def list(request):
    return render(request, 'todo_frontend/list.html')