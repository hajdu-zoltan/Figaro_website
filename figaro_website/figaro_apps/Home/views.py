# Create your views here.
from email import message
from http.client import HTTPResponse
import imp
from pickle import NONE
from django.http import HttpResponse
from django.shortcuts import render, redirect
from . models import Price, Hairdresser, Booked_appointments1
from django.contrib.auth.models import User
from .forms import FormWithCaptcha
from django.contrib import messages
from datetime import datetime
from django.core.mail import EmailMessage
from .forms import NewUserForm
from django.contrib.auth import login, authenticate, logout 
from django.contrib.auth.forms import AuthenticationForm
from django.template.loader import render_to_string
from django.db.models.query_utils import Q
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.contrib.auth.forms import PasswordResetForm
from django.core.mail import send_mail, BadHeaderError



price_datas = Price.objects.all()
hairdressers = Hairdresser.objects.all()
user_id = -1

def test(request):
    return render(request, "Test.html", {'actual_page': 'test',})

def navbar(request):
    actual_page = ''
    return render(request, "Navbar.html", {'actual_page': 'navbar'})

def home(request):
    return render(request, "Home.html", {'actual_page': 'home', 'range':range(12), 'user_id':user_id, 'price_datas':price_datas, 'hairdressers':hairdressers})

def gallery(request):
    return render(request, "Gallery.html", {'actual_page': 'gallery', 'user_id':user_id, 'range':range(15)})

def price(request):
    if request.method == 'GET':
        price_datas = Price.objects.all()
        return render(request, "Price_list.html", {'actual_page': 'price', 'user_id':user_id, 'price_datas': price_datas})

def price_list_women(request):
    if request.method == 'GET':
        price_datas = Price.objects.all()
        return render(request, "Price_list.html", {'actual_page': 'price_list_women', 'user_id':user_id, 'price_datas': price_datas})

def price_list_man(request):
    if request.method == 'GET':
        price_datas = Price.objects.all()
        return render(request, "Price_list.html", {'actual_page': 'price_list_man', 'user_id':user_id, 'price_datas': price_datas})


def booking(request):
    _name = None
    _email = None
    _phone= None
    _categori_id= None
    booked_appointments = Booked_appointments1.objects.all()
    price = Price.objects.all()
    if request.method == 'GET':
        hairdresser_id = request.GET.get('hairdresser_id', -1)
        categori_id = request.GET.get('categori_id', -1)
        return render(request, "Booking.html", {'actual_page': 'booking', 'user_id':user_id, 'price':price,'booked_appointments':booked_appointments,'number':range(9,20), 'hairdressers':hairdressers, 'hairdresser_id':int(hairdresser_id), 'categori_id':int(categori_id)})
    elif request.method == 'POST':
        _name = request.POST.get('name')
        _email = request.POST.get('email')
        _phone = request.POST.get('phone')
        _hairdresser_id = int(request.POST.get('hairdresser_id'))
        _categori_id = int(request.POST.get('category'))
        _date = request.POST.get('date')
        _date = datetime.strptime(_date, '%Y. %m. %d. %H:%M:%S')
        _time = request.POST.get('time')
        form = FormWithCaptcha(request.POST)
        errors=0
        if form.is_valid():
            if _name == '' or _email == '' or _phone == '' or _categori_id == '' or _date == '' or _time == '' or _hairdresser_id == '':
                errors+=1
                messages.success(request, "Tölsd ki az összes mezőt!")
                return render(request, "Booking.html", {'actual_page': 'booking', 'user_id':user_id, 'price':price,'booked_appointments':booked_appointments,'number':range(9,20),'email':_email, 'name':_name})

            if errors == 0:
                Booked_appointments_ = Booked_appointments1(
                    date=_date,
                    time=_time,
                    email=_email,
                    phone=_phone,
                    name=_name,
                    hairdresser_id=_hairdresser_id,
                    categori=Price.objects.get(id = _categori_id)
                )
                Booked_appointments_.save()
                _hairdresser=Hairdresser.objects.get(id = _hairdresser_id)
                _date=str(_date).split(' ')
                subject="Időpont fogalalás"
                email_template_name = "booking_mail.txt"
                c = {
					"name": _name,
                    "date": _date[0],
                    "time": _time
					}
                email = render_to_string(email_template_name, c)
                send_mail(subject, email, 'figaroszeged@gmail.com' , [_email], fail_silently=False)
                
                return render(request, "Successful_booking.html", {'actual_page': 'booking', 'user_id':user_id, 'email':_email, 'name':_name, 'date':_date[0], 'time':_time, 'hairdresser':_hairdresser, 'categori':Price.objects.get(id = _categori_id)})
        else:
            messages.success(request, "Nem megfelelően töltötte ki az adatokat!")
            return render(request, "Booking.html", {'actual_page': 'booking', 'user_id':user_id, 'price':price,'booked_appointments':booked_appointments,'number':range(9,20),'email':_email, 'name':_name,'hairdressers':hairdressers, 'hairdresser_id':int(_hairdresser_id), 'categori_id':_categori_id})

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


def _login(request):
    if request.method == 'GET':
        return render(request, "Login.html", {'actual_page': 'login'})
    elif request.method == 'POST':
        users = User.objects.all()
        _email = request.POST.get('email')
        _password = request.POST.get('password')
        login = False
        user_id = -1
        for user in users:
            if user.email == _email:
                if user.password == _password:
                    login = True
                    user_id = user.id
        if login:
            return render(request, "Home.html", {'actual_page': 'home', 'prices':price_datas, 'hairdressers':hairdressers, 'user_id':user_id})
            #return render(request, "Registration.html", {'actual_page': 'registration'})
        else:
            return render(request, "Login.html", {'actual_page': 'login'})
           
        #user = User(email=email, password=password)
        # user.save()

def register_request(request):
	if request.method == "POST":
		form = NewUserForm(request.POST)
		if form.is_valid():
			user = form.save()
			login(request, user)
			messages.success(request, "Registration successful." )
			return redirect("/home/")
		messages.error(request, "Unsuccessful registration. Invalid information.")
	form = NewUserForm()
	return render (request=request, template_name="Registration.html", context={"form":form})

def login_request(request):
	if request.method == "POST":
		form = AuthenticationForm(request, data=request.POST)
		if form.is_valid():
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password')
			user = authenticate(username=username, password=password)
			if user is not None:
				login(request, user)
				messages.info(request, f"You are now logged in as {username}.")
				return redirect("/home/")
			else:
				messages.error(request,"Invalid username or password.")
		else:
			messages.error(request,"Invalid username or password.")
	form = AuthenticationForm()
	return render(request=request, template_name="Login.html", context={"form":form})

def logout_request(request):
	logout(request)
	messages.info(request, "You have successfully logged out.") 
	return redirect("/home/")

def password_reset_request(request):
	if request.method == "POST":
		password_reset_form = PasswordResetForm(request.POST)
		if password_reset_form.is_valid():
			data = password_reset_form.cleaned_data['email']
			associated_users = User.objects.filter(Q(email=data))
			if associated_users.exists():
				for user in associated_users:
					subject = "Password Reset Requested"
					email_template_name = "password_reset_email.txt"
					c = {
					"email":user.email,
					'domain':'192.168.1.69',
					'site_name': 'Website',
					"uid": urlsafe_base64_encode(force_bytes(user.pk)),
					"user": user,
					'token': default_token_generator.make_token(user),
					'protocol': 'http',
					}
					email = render_to_string(email_template_name, c)
					try:
						send_mail(subject, email, 'figaroszeged@gmail.com' , [user.email], fail_silently=False)
					except BadHeaderError:
						return HttpResponse('Invalid header found.')
					return redirect ("/password_reset/done/")
	password_reset_form = PasswordResetForm()
	return render(request=request, template_name="Password_reset.html", context={"password_reset_form":password_reset_form})