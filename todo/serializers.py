from rest_framework import serializers
from . import models

class UpdateToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ToDoItem
        fields = "__all__"