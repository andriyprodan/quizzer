from rest_framework import serializers
from .models import Quiz, Question, Answer

class CreateAnswerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Answer
    fields = ['text']

class CreateQuestionSerializer(serializers.ModelSerializer):
  answers = CreateAnswerSerializer(many=True)

  class Meta:
    model = Question
    fields = ['text', 'answers', 'correct_answer']


class CreateQuizSerializer(serializers.ModelSerializer):
  questions = CreateQuestionSerializer(many=True)

  class Meta:
    model = Quiz
    fields = ['title', 'questions']

  def create(self, validated_data):
    questions_data = validated_data.pop('questions')
    quiz = Quiz.objects.create(**validated_data)
    for question_data in questions_data:
      answers_data = question_data.pop('answers')
      question = Question.objects.create(quiz=quiz, **question_data)
      # now 'correct_answer' property from question_data is an order key (not an answer id)
      # we need to reassign it to answer id
      answerIds = []
      for answer_data in answers_data:
        if len(answer_data):
          answer = Answer.objects.create(question=question, **answer_data)
          answerIds.append(answer.id)
      # assign id of the newly created answer to the correct_answer property of the question
      question.correct_answer = answerIds[question.correct_answer]
      question.save()
    return quiz


class AnswerSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Answer
    fields = ['id', 'text']

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
  answers = AnswerSerializer(many=True)

  class Meta:
    model = Question
    fields = ['id', 'text', 'answers']

class QuizSerializer(serializers.HyperlinkedModelSerializer):
  questions = serializers.HyperlinkedRelatedField(many=True, view_name='question-detail', read_only=True)

  class Meta:
    model = Quiz
    fields = ['url', 'id', 'title', 'questions']
