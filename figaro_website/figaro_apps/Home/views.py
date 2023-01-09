# Create your views here.
from email import message
from http.client import HTTPResponse
import imp
from pickle import NONE
from django.http import HttpResponse
from django.shortcuts import render, redirect
from . models import User, Price, Hairdresser, Booked_appointments1
from .forms import FormWithCaptcha
from django.contrib import messages
from datetime import datetime
from django.core.mail import EmailMessage


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
    _name = ''
    _email = ''
    _phone=''
    _category=''
    booked_appointments = Booked_appointments1.objects.all()
    price = Price.objects.all()
    if request.method == 'GET':
        return render(request, "Booking.html", {'actual_page': 'booking','price':price,'booked_appointments':booked_appointments,'number':range(9,20)})
    elif request.method == 'POST':
        _name = request.POST.get('name')
        _email = request.POST.get('email')
        _phone = request.POST.get('phone')
        _category = request.POST.get('category')
        _date = request.POST.get('date')
        _date = datetime.strptime(_date, '%Y. %m. %d. %H:%M:%S')
        _time = request.POST.get('time')
        form = FormWithCaptcha(request.POST)
        errors=0
        if form.is_valid():
            if _name == '' or _email == '' or _phone == '' or _category == '' or _date == '' or _time == '':
                errors+=1
                messages.success(request, "Tölsd ki az összes mezőt!")
                return render(request, "Booking.html", {'actual_page': 'booking','price':price,'booked_appointments':booked_appointments,'number':range(9,20),'email':_email, 'name':_name})

            if errors == 0:
                Booked_appointments_ = Booked_appointments1(date=_date, time=_time, email=_email, phone=_phone, name=_name)
                Booked_appointments_.save()
                code = '1234'
                _date=str(_date).split(' ')
                message = f'Tisztelt {_name} Időpont foglalása sikeresen megtörtént. Az időpontja a következő:{_date[0]} {_time} Üdvözlettel Figaro.'
                email = EmailMessage('Időpont fogalalás', message, to=[_email])
                email.send()
                return render(request, "Successful_booking.html", {'actual_page': 'booking', 'email':_email, 'name':_name, 'date':_date[0], 'time':_time})
        else:
            messages.success(request, "Nem megfelelően töltötte ki az adatokat!")
            return render(request, "Booking.html", {'actual_page': 'booking','price':price,'booked_appointments':booked_appointments,'number':range(9,20),'email':_email, 'name':_name})

        return render(request, "Registration.html", {'actual_page': 'conformation', 'code': code})

def confirmation(request):
    if request.method == 'GET':
        code = '1234'
        return render(request, "Confirmation.html", {'actual_page': 'conformation', 'code': code})
    elif request.method == 'POST':
        _code = request.POST.get('code')

def register(request):
    form = FormWithCaptcha(request.POST)
    form = FormWithCaptcha()
    _name = ''
    _email = ''
    _password = ''
    _forget_password = ''
    _phone=''
        
    if request.method == 'POST':
        form = FormWithCaptcha(request.POST)
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
        form = FormWithCaptcha()
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

