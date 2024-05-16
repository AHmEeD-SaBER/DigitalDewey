from django.http import HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from page.views import index

# Create your views here.
def signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']
        email = request.POST['email']
        type = request.POST['sign']

        myuser = User.objects.create_user(username, email, pass1)
        myuser.type = type
        myuser.save()
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
            return redirect('Login')
    return render(request, 'HTML/Login.html')


def signout(request):
    logout(request)
    return redirect('page:index')


