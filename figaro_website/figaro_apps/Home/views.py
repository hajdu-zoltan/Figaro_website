# Create your views here.
from email import message
from http.client import HTTPResponse
import imp
from pickle import NONE
from django.http import HttpResponse
from django.shortcuts import render, redirect
from . models import User, Price, Hairdresser, Booked_appointmentss
from .forms import Myform
from django.contrib import messages


def test(request):
    return render(request, "Test.html", {'actual_page': 'test',})

def navbar(request):
    actual_page = ''
    return render(request, "Navbar.html", {'actual_page': 'navbar'})

def home(request):
    price_datas = Price.objects.all()
    hairdressers = Hairdresser.objects.all()
    return render(request, "Home.html", {'actual_page': 'home', 'prices':price_datas, 'hairdressers':hairdressers})

def gallery(request):
    return render(request, "Gallery.html", {'actual_page': 'gallery'})

def price(request):
    if request.method == 'GET':
        price_datas = Price.objects.all()
        return render(request, "Price_list.html", {'actual_page': 'price', 'price_datas': price_datas})

def price_list_women(request):
    if request.method == 'GET':
        price_datas = Price.objects.all()
        return render(request, "Price_list.html", {'actual_page': 'price_list_women', 'price_datas': price_datas})

def price_list_man(request):
    if request.method == 'GET':
        price_datas = Price.objects.all()
        return render(request, "Price_list.html", {'actual_page': 'price_list_man', 'price_datas': price_datas})


def booking(request):
    search_value = request.GET.get("check_this", None)
    booked_appointments = Booked_appointmentss.objects.all()
    if request.method == 'GET':
        return render(request, "Booking.html", {'actual_page': 'booking','booked_appointments':booked_appointments,'number':range(9,20)})
    elif request.method == 'POST':
        return render(request, "Registration.html", {'actual_page': 'registration'})


    return redirect('Home', {'actual_page': 'home'})
    

def register(request):
    form = Myform(request.POST)
    form = Myform()
    _name = ''
    _email = ''
    _password = ''
    _forget_password = ''
    _phone=''
        
    if request.method == 'POST':
        form = Myform(request.POST)
        _name = request.POST.get('name')
        _email = request.POST.get('email')
        _password = request.POST.get('password')
        _forget_password = request.POST.get('forget_password')
        _phone = request.POST.get('phone')
        if form.is_valid():
            errors=0
            users = User.objects.all()
            
            if _name == '' or _email == '' or _password == '' or _forget_password == '':
                errors+=1
                messages.success(request, "Tölsd ki az összes mezőt!")
            else:
                for user in users:
                    if user.email == _email:
                        messages.success(request, "Ezzel az email címmel már regisztráltak")
                        errors += 1
                if _password != _forget_password:
                    messages.success(request, "A megadot jelszavak nem egyeznek!")
                    errors += 1
                if errors == 0: 
                    user = User(name=_name, email=_email, password=_password)
                    user.save()
                    return render(request, "Login.html", {'actual_page': 'login', 'form': form})
        else:
             messages.success(request, "Nem megfelelően töltötte ki az adatokat!")          
    else:
        form = Myform()
    return render(request, "Registration.html", {'actual_page': 'registration', 'form': form, 'email':_email, 'name':_name, 'password':_password, 'forget_password':_forget_password, 'phone':_phone})


def login(request):
    if request.method == 'GET':
        return render(request, "Login.html", {'actual_page': 'login'})
    elif request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = User(email=email, password=password)
        # user.save()

        return redirect('Home/', {'actual_page': 'home'})

