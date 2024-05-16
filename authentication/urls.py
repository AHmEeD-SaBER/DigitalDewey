app_name = 'authentication'
from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.signin, name='Login'),
    path('signup/', views.signup, name='Signup'),
    path('logout/', views.signout, name='Logout'),
]