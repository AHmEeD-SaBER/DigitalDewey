app_name = 'Books'
from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from .models import Book

def search(request):
    query = request.GET.get('q')
    books = Book.objects.filter(title__icontains=query) | Book.objects.filter(author__icontains=query) | Book.objects.filter(category__icontains=query)
    books_json = serializers.serialize('json', books)
    return JsonResponse(books_json, safe=False)