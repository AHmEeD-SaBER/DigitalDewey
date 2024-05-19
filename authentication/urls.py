app_name = 'authentication'
from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.signin, name='Login'),
    path('signup/', views.signup, name='Signup'),
    path('logout/', views.signout, name='Logout'),
    path('api/user/', views.user_info, name='userInfo'),
    path('api/loggedin/', views.is_logged_in, name='is_logged_in'),
]