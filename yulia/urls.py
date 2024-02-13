from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("main.urls")),
    path('reasons/', include("reasons.urls")),
    path('api/todo/', include('todo_api.urls')),
    path('todo/', include('todo_frontend.urls'))
]
 