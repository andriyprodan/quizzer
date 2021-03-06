from django.db import models
from django.contrib.auth.models import User

class Quiz(models.Model):
  title = models.CharField(max_length=50, unique=True)

# Create your models here.
class Question(models.Model):
  text = models.TextField(null=False)
  quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
  correct_answer = models.IntegerField(null=False)

class Answer(models.Model):
  text = models.TextField(null=False)
  question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)