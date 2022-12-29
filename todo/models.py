from django.db import models
from django.utils.translation import gettext_lazy as _

class ToDoItem(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False, verbose_name=_("Created"))
    updated_at = models.DateTimeField(auto_now=True, editable=False, verbose_name=_("Updated"))
    status = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title