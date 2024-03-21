from rest_framework.serializers import ModelSerializer
from library.models import MyUser,Book,Author,Bookshelf,Subject

class UserSerializer(ModelSerializer):
    class Meta:
        model = MyUser
        fields = '__all__'

class BookshelfSerializer(ModelSerializer):
    class Meta:
        model = Bookshelf
        fields = '__all__'

class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class AuthorSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class BookSerializer(ModelSerializer):
    author = AuthorSerializer()
    subjects = SubjectSerializer(many=True)
    bookshelves = BookshelfSerializer(many=True)

    class Meta:
        model = Book
        fields = '__all__'