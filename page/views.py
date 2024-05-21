from django.shortcuts import render
from Books.models import Book
from django.core import serializers
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
import json

def index(request):
    books = Book.objects.all()
    sections = Book.objects.values_list('section', flat=True).distinct().filter(section__in=["Popular", "Sale", "Most Read"])
    if request.method == 'POST':
        username = request.POST['username']
        pass1 = request.POST['pass1']
        user = authenticate(username=username, password=pass1)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('page:index'), {'user': username})
        else:
            return redirect('page:index')
    return render(request, 'HTML/index.html', {'books': books , 'sections':sections})

def About(request):
    return render(request, 'HTML/About.html' )

def Profile(request):
    return render(request, 'HTML/Profile.html' )

def AddBook(request):
    return render(request, 'HTML/AddBook.html' )

def Allbooks(request):
    books = Book.objects.all()
    categories = sorted(Book.objects.values_list('category', flat=True).distinct())
    return render(request, 'Books/AllBooks.html' , {'books':books, 'categories':categories})

def BD(request, book_id):
    book = Book.objects.get(id=book_id)
    myuser =  request.user
    return render(request, 'Books/Book-Details.html', {'book': book, 'user': myuser})