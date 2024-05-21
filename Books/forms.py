from django import forms
from .models import Book

class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'category', 'available', 'cover', 'description', 'price', 'section']

class addBookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'category', 'price', 'available', 'description', 'cover', 'section']
        widgets = {
            'title': forms.TextInput(attrs={'placeholder': 'Book Name'}),
            'author': forms.TextInput(attrs={'placeholder': 'Book Author'}),
            'category': forms.TextInput(attrs={'placeholder': 'Book Category'}),
            'price': forms.NumberInput(attrs={'placeholder': 'Book Price'}),
            'available': forms.TextInput(attrs={'placeholder': 'Book Available'}),
            'description': forms.Textarea(attrs={'placeholder': 'Book Description'}),
            'section': forms.TextInput(attrs={'placeholder': 'Book Section'}),
        }