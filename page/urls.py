app_name = 'page'
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.About, name='About'),
    path('profile', views.Profile, name='Profile'),
    path('categories', views.Categories, name='Categories'),
    path('All-Books', views.Allbooks, name='AllBooks'),
    path('Book_Details/<int:book_id>/', views.BD, name='Book_Details'),


]