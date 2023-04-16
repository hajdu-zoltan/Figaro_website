from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.home, name = 'Home'),
    path('home/', views.home, name = 'Home'),
    path('navbar/', views.navbar, name = 'Navbar'),
    #path('register/', views.register, name = 'Registration'),
    path('register/', views.register_request, name = 'Registration'),
    path('login/', views.login_request, name = 'Login'),
    path("logout/", views.logout_request, name= "Logout"),
    path('accounts/', include('django.contrib.auth.urls')),
    path('booking/', views.booking, name = 'Booking'),
    path('confirmation/', views.confirmation, name = 'Confirmation'),
    path('gallery/', views.gallery, name = 'Gallery'),
    path('price/', views.price, name = 'Price'),
    path('price_list_man/', views.price_list_man, name = 'Price_man'),
    path('price_list_women/', views.price_list_women, name = 'Price_women'),
    path('price_list_examination/', views.price_list_examination, name = 'Price_examination'),
    path('test/', views.test, name = 'Test'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='Password_reset_done.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name="Password_reset_confirm.html"), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='Password_reset_complete.html'), name='password_reset_complete'),
    path("password_reset", views.password_reset_request, name="password_reset")      

]
