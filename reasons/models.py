from django.db import models

# Create your models here.

class Reason(models.Model):
    name = models.CharField(max_length=255, blank=False)
    description = models.TextField(max_length=1000, blank=True)

    def __str__(self) -> str:
        return self.name

