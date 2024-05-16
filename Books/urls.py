app_name = 'Books'
from django.urls import path
from . import views

urlpatterns = [
    # path('Books/avail-search', views.avail_search, name='avail_search'),
    # path('search/', views.search, name='search'),
    # path('available_books/', views.get_available_books, name='available_books'),
    path('avail-search/', views.search_and_filter_books, name='search_and_filter_books'),
]