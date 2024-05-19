app_name = 'Books'
from django.urls import path
from . import views

urlpatterns = [
    path('avail-search/', views.search_and_filter_books, name='search_and_filter_books'),
    path('delete/<int:id>/', views.delete, name='delete'),
    path('edit/<int:id>/', views.edit, name='edit'),
    path('add/', views.add, name='add'),
]