from django.db import models

# Create your models here.

class Reason(models.Model):
    name = models.CharField(max_length=255, blank=False, unique=True)
    description = models.TextField(max_length=1000, blank=True, unique=True)

    def __str__(self) -> str:
        return self.name

