from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Quiz, Question, Answer
from .serializers import (
  CreateQuizSerializer,
  CreateQuestionSerializer,
  CreateAnswerSerializer,
  QuizSerializer, 
  QuestionSerializer, 
  AnswerSerializer,
)

# Create your views here.
class QuizViewSet(viewsets.ModelViewSet):
  queryset = Quiz.objects.all()
  serializer_class = QuizSerializer

class QuestionViewSet(viewsets.ModelViewSet):
  queryset = Question.objects.all()
  serializer_class = QuestionSerializer

class AnswerViewSet(viewsets.ModelViewSet):
  queryset = Answer.objects.all()
  serializer_class = AnswerSerializer

class CreateQuizView(APIView):
  serializer_class = CreateQuizSerializer

  def post(self, request, format=None):
    serializer = CreateQuizSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({'question_id': serializer.instance.id}, status=status.HTTP_200_OK)

    return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class GetCorrectAnswer(APIView):
  def get(self, request, format=None):
    question = Question.objects.filter(pk=request.GET.get('question_id')).get()

    return Response({'correct_answer': question.correct_answer}, status=status.HTTP_200_OK)
