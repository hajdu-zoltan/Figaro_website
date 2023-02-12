from unittest.util import _MAX_LENGTH
from django.db import models
from django.db.models.base import Model
from datetime import datetime


# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    joined_date= models.DateField(auto_now_add=True)


    def __str__(self):
        return f"name: {self.name}, email: {self.email}"

class Price(models.Model):
    tittle = models.CharField(max_length=37)
    price = models.CharField(max_length=10)
    barber_name = models.CharField(max_length=50)
    description= models.CharField(max_length=200)
    categori = models.BigIntegerField()
    time = models.CharField(max_length=8)

    def __str__(self):
        return f"tittle: {self.tittle}, price: {self.price}, barber_name: {self.barber_name}, description: {self.description}, categori: {self.categori}, time: {self.time}"

class Hairdresser(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=10000)
    phone = models.CharField(max_length=50)
    occupation = models.CharField(max_length=50)

    def __str__(self):
        return f"name: {self.name}, description: {self.description}, phone: {self.phone}, occupation: {self.occupation}"

class Booked_appointments(models.Model):
    date = models.DateField()
    time = models.TimeField()
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"date: {self.date}, email: {self.email}, phone: {self.phone}, name:{self.name}"

class Booked_appointments1(models.Model):
    date = models.DateField()
    time = models.TimeField()
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    hairdresser_id =models.BigIntegerField()
    categori= models.ForeignKey(Price, db_column='categori', on_delete=models.CASCADE)

    def __str__(self):
        return f"date: {self.date}, email: {self.email}, phone: {self.phone}, name:{self.name}, hairdresser_id:{self.hairdresser_id}, categori:{self.categori}"
