import json
from django.core.management.base import BaseCommand
from Books.models import Book

class Command(BaseCommand):
    help = 'Load books from JSON file'

    def handle(self, *args, **options):
        with open('project/static/Scripts/output.json', 'r') as f:
            books_array = json.load(f)
            for book_data in books_array:
                Book.objects.create(
                    title=book_data['name'],
                    author=book_data['author'],
                    cover=book_data['imageSrc'],
                    category=book_data['category'],
                    price=book_data['price'],
                    available=book_data['availability'],
                    description=book_data['description'],
                    section=book_data['section'],
                )