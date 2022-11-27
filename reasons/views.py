from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from . import models
from django.template import loader
# Create your views here.


def index(request):
    template = "reasons/reasons.html"
    try:
        random_reason = models.Reason.objects.order_by("?")[0]
    except models.Reason.DoesNotExist:
        return render(request, template, {"random_reason": None})
    context = {"random_reason": random_reason}
    return render(request, template, context)

def get_reason(request):
    try:
        random_reason = models.Reason.objects.order_by("?")[0]
    except models.Reason.DoesNotExist:
        return HttpResponse("Я не знаю что еще сказать..")
    return HttpResponse(random_reason)