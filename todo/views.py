from django.shortcuts import render, redirect
from . import models
# Create your views here.
from django.views.generic import ListView, CreateView
from . import serializers


class ToDoView(ListView):
    model = models.ToDoItem
    template_name = "todo/todo.html"

    def get_queryset(self):
        return models.ToDoItem.objects.filter(status=False)

    def get_context_data(self, **kwargs) :
        context = super().get_context_data()
        context["todos"] = self.get_queryset()
        return context

def add(request):
    if request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        todo = models.ToDoItem(title=title, content=content)
        todo.save()

        return redirect('/todo/')
    else:
        return render(request, 'todo/todo-add.html')

def details(request, id):
    todo = models.ToDoItem.objects.get(id=id)

    context = {
        "todo": todo
    }
    return render(request, 'todo/todo-details.html', context)

def delete(request, id):
    todo = models.ToDoItem.objects.get(id=id)
    todo.delete()

    return redirect('/todo/')

def update(request, id):
    if request.method == 'POST':
        data = request.POST
        todo = models.ToDoItem.objects.get(id=id)
        serializer = serializers.UpdateToDoSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.update(todo, serializer.validated_data)
        return redirect(f'todo/{todo.id}')
    else:
        return render(request, 'todo/todo-update.html')


def change_status(request, id):
    if request.method == 'POST':
        status = request.POST["status"]
        todo = models.ToDoItem.objects.get(id=id)
        todo.status = status
        todo.save()
    return redirect(f'todo/{todo.id}')

