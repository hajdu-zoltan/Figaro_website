# Generated by Django 4.1.5 on 2023-01-27 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Home', '0008_alter_price_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='price',
            name='time',
            field=models.CharField(max_length=8),
        ),
    ]
