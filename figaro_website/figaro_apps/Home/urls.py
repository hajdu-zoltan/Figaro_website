from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.home, name = 'Home'),
    path('home/', views.home, name = 'Home'),
    path('navbar/', views.navbar, name = 'Navbar'),
    path('register/', views.register, name = 'Registration'),
    path('login/', views.login, name = 'Login'),
    path('booking/', views.booking, name = 'Booking'),
    path('confirmation/', views.confirmation, name = 'Confirmation'),
    path('gallery/', views.gallery, name = 'Gallery'),
    path('price/', views.price, name = 'Price'),
    path('price_list_man/', views.price_list_man, name = 'Price_man'),
    path('price_list_women/', views.price_list_women, name = 'Price_women'),
    path('test/', views.test, name = 'Test'),
]
