from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name=''),
    path('create-quiz', index),
    path('quiz/<int:id>', index),
]