app_name = 'Books'
from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from .models import Book

def search(request):
    query = request.GET.get('query')
    books = Book.objects.filter(title__icontains=query) | Book.objects.filter(author__icontains=query) | Book.objects.filter(category__icontains=query)
    books_json = serializers.serialize('json', books)
    return JsonResponse(books_json, safe=False)

def get_available_books(request):
    if request.GET.get('available') == 'true':
        books = Book.objects.filter(available=True)
    else:
        books = Book.objects.all()
    books_json = serializers.serialize('json', books)
    return JsonResponse(books_json, safe=False)

# def avail_search(request):
#     query = request.GET.get('q')
#     only_available = request.GET.get('available') == 'true'
#     books = Book.objects.all()

#     if query:
#         Book.objects.filter(title__icontains=query) | Book.objects.filter(author__icontains=query) | Book.objects.filter(category__icontains=query)

#     if only_available:
#         books = Book.objects.filter(available=True)

#     books_json = serializers.serialize('json', books)
#     return JsonResponse(books_json, safe=False)