from django.shortcuts import render

# Create your views here.

def list(request):
    return render(request, 'todo_frontend/list.html')