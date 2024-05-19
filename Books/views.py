app_name = 'Books'
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core import serializers
from .models import Book
from django.http import HttpResponse
from .forms import BookForm, addBookForm
import json

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

def delete(request, id):
    if request.method == 'POST':
        book = get_object_or_404(Book, id=id)
        book.delete()
        return JsonResponse({'message': 'Book deleted successfully'})
    return JsonResponse({'error': 'Invalid request'}, status=400)

def edit(request, id):
    book = get_object_or_404(Book, id=id)
    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES, instance=book)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Book updated successfully'})
        else:
            return JsonResponse({'error': form.errors}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)

def add(request):
    if request.method == 'POST':
        form = addBookForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Book added successfully'}, status=200)
        else:
            return JsonResponse({'error': form.errors}, status=400)
    else:
        form = addBookForm()
        return render(request, 'AddBook.html', {'form': form})