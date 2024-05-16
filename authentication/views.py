from django.http import HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from page.views import index
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User, Permission
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from Books.models import Book


def signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']
        email = request.POST['email']
        type = request.POST['sign']

        # Create user
        myuser = User.objects.create_user(username, email, pass1)
        myuser.is_staff = (type == 'Admin')

        # Fetch content type for the Book model
        content_type = ContentType.objects.get_for_model(Book)

        # Fetch permissions
        can_delete_book = Permission.objects.get(content_type=content_type, codename='delete_book')
        can_view_book = Permission.objects.get(content_type=content_type, codename='view_book')
        can_add_book = Permission.objects.get(content_type=content_type, codename='add_book')
        can_change_book = Permission.objects.get(content_type=content_type, codename='change_book')

        # Assign permissions if user is admin
        if myuser.is_staff:
            myuser.user_permissions.add(can_delete_book, can_view_book, can_add_book, can_change_book)

        # Save user
        myuser.save()

        # Send success message and redirect
        messages.success(request, "Your account has been successfully created")
        return redirect('authentication:Login')

    return render(request, 'HTML/SignUp.html')

def signin(request):
    if request.method == 'POST':
        username = request.POST['username']
        pass1 = request.POST['pass1']
        user = authenticate(username=username, password=pass1)
        if user is not None:
            login(request, user)
            messages.success(request, "Successfully Logged In")
            return HttpResponseRedirect(reverse('page:index'), {'user': username})
        else:
            messages.error(request, "Invalid Credentials")
            return redirect('authentication:Login')
    return render(request, 'HTML/Login.html')

def signout(request):
    logout(request)
    return redirect('page:index')

@login_required
def is_admin(request):
    return JsonResponse({'is_admin': request.user.is_superuser})