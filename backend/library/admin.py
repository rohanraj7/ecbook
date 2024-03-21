from django.contrib import admin

# Register your models here.
from .models import MyUser, Author, Book, Subject, Bookshelf

# Register your models here.
admin.site.register(MyUser)
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(Subject)
admin.site.register(Bookshelf)