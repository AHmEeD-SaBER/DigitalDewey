# Generated by Django 5.0.4 on 2024-05-12 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Books', '0002_alter_book_cover'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='section',
            field=models.CharField(default='General', max_length=100),
        ),
    ]
