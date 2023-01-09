from django.contrib import admin
from . models import User, Price, Hairdresser,Booked_appointments1

# Register your models here.
admin.site.register(User)
admin.site.register(Price)
admin.site.register(Hairdresser)
admin.site.register(Booked_appointments1)