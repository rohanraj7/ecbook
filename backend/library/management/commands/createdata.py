import requests
from django.core.management.base import BaseCommand
from faker import Faker
from library.models import Author, Book, Subject, Bookshelf



class Command(BaseCommand):
    help = 'Populate dummy data for testing'

    def get_random_photo_url(self):
        response = requests.get('https://picsum.photos/200/300')
        if response.status_code == 200:
            return response.url
        else:
            return None

    def handle(self, *args, **kwargs):
        print("Helo")
        fake = Faker()

        # Populate authors
        for _ in range(20):
            Author.objects.create(name=fake.name())

        # Populate subjects
        for _ in range(20):
            Subject.objects.create(name=fake.word())

        # Populate bookshelves
        for _ in range(20):
            Bookshelf.objects.create(name=fake.word())

        # Populate books
        for _ in range(20):
            title = fake.sentence(nb_words=4)
            author = Author.objects.order_by('?').first()
            genre = fake.word()
            language = fake.language_code()
            photo = self.get_random_photo_url()
            book = Book.objects.create(title=title, author=author, genre=genre, language=language, photo=photo)

            # Add random subjects and bookshelves to the book
            subjects = Subject.objects.order_by('?')[:fake.random_int(min=1, max=5)]
            book.subjects.set(subjects)

            bookshelves = Bookshelf.objects.order_by('?')[:fake.random_int(min=1, max=3)]
            book.bookshelves.set(bookshelves)

        self.stdout.write(self.style.SUCCESS('Dummy data populated successfully'))

