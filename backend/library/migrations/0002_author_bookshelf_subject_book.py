# Generated by Django 5.0.3 on 2024-03-19 18:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("library", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Author",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("bio", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="Bookshelf",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Subject",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Book",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                (
                    "photo",
                    models.ImageField(blank=True, null=True, upload_to="book_photos"),
                ),
                ("genre", models.CharField(max_length=100)),
                ("language", models.CharField(max_length=50)),
                (
                    "author",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="library.author"
                    ),
                ),
                ("bookshelves", models.ManyToManyField(to="library.bookshelf")),
                ("subjects", models.ManyToManyField(to="library.subject")),
            ],
        ),
    ]
