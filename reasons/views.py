from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from . import models
from django.template import loader
# Create your views here.


def index(request):
    template = "reasons/reasons.html"
    random_reason = models.Reason.objects.order_by("?")
    if not random_reason:
        return render(request, template, {"random_reason": None})
    context = {"random_reason": random_reason[0]}
    return render(request, template, context)

def ajax_get_reason(request):
    random_reason = models.Reason.objects.order_by("?")
    if not random_reason:
        return JsonResponse({
            "success": False,
            })
    return JsonResponse({
            "success": True,
            "reason_name": random_reason[0].name,
            "reason_description": random_reason[0].description
        })