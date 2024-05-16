app_name = 'Books'
from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from .models import Book

def search_and_filter_books(request):
    query = request.GET.get('query', '')
    available = request.GET.get('available')

    books = Book.objects.all()

    if query:
        books = books.filter(title__icontains=query) | books.filter(author__icontains=query) | books.filter(category__icontains=query)

    if available == 'true':
        books = books.filter(available=True)

    books_json = serializers.serialize('json', books)
    return JsonResponse(books_json, safe=False)
