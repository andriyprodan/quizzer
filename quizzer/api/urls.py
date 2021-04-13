from django.urls import path
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
router.register(r'quizzes', views.QuizViewSet)
router.register(r'questions', views.QuestionViewSet)
router.register(r'answers', views.AnswerViewSet)

urlpatterns = [
]

urlpatterns += router.urls