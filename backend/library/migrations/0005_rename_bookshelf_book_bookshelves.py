# Generated by Django 5.0.3 on 2024-03-19 21:57

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("library", "0004_rename_bookshelves_book_bookshelf_alter_book_photo"),
    ]

    operations = [
        migrations.RenameField(
            model_name="book",
            old_name="bookshelf",
            new_name="bookshelves",
        ),
    ]