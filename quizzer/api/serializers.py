from rest_framework import serializers
from .models import Quiz, Question, Answer

class QuizSerializer(serializers.HyperlinkedModelSerializer):
  questions = serializers.HyperlinkedRelatedField(many=True, view_name='question-detail', read_only=True)

  class Meta:
    model = Quiz
    fields = ['url', 'id', 'title', 'questions']

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
  answers = serializers.HyperlinkedRelatedField(many=True, view_name='answer-detail', read_only=True)

  class Meta:
    model = Question
    fields = ['url', 'id', 'text', 'answers']

class AnswerSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Answer
    fields = ['url', 'id', 'text', 'is_correct']