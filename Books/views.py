app_name = 'Books'
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.core import serializers
from .models import Book, BorrowedBook
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
        books = books.filter(available='Available')

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
    
@login_required
def borrow(request, id):
    book = get_object_or_404(Book, pk=id)
    if request.method == 'POST':
        if BorrowedBook.objects.filter(book=book, borrower=request.user).exists():
            return JsonResponse({'status': 'error', 'message': 'You have already borrowed this book.'}, status=400)
        BorrowedBook.objects.create(
            book=book,
            borrower=request.user,
        )
        return JsonResponse({'status': 'success', 'message': 'Book successfully borrowed.'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=405)

@login_required
def borrowed(request, id):
    try:
        book = get_object_or_404(Book, pk=id)
        borrowed = BorrowedBook.objects.filter(book=book, borrower=request.user).exists()
        return JsonResponse({'status': 'success', 'has_borrowed': borrowed})
    except Exception as e:
        # Log the exception; this is crucial to understanding what went wrong
        print(e)
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    
@login_required
def returnbook(request, id):
    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=405)
    try:
        borrowed_book = BorrowedBook.objects.get(book_id=id, borrower=request.user)
        borrowed_book.delete()  # Or mark as returned based on your model design
        return JsonResponse({'status': 'success', 'message': 'Book returned successfully.'})
    except BorrowedBook.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Book not found or not borrowed by user.'}, status=404)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)