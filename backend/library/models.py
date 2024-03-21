from django.db import models
# Create your models here.
from django.contrib.auth.models import AbstractUser


class MyUser(AbstractUser):
    photo = models.ImageField(upload_to='user_photos', blank=True, null=True)

    def __str__(self):
        return self.username

class Author(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    photo = models.ImageField(upload_to='book_photos/', blank=True, null=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    genre = models.CharField(max_length=100)
    language = models.CharField(max_length=50)
    subjects = models.ManyToManyField('Subject')
    bookshelves  = models.ManyToManyField('Bookshelf')

    def __str__(self):

        return self.title

class Subject(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Bookshelf(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name



