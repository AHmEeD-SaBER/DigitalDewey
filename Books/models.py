from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    cover = models.ImageField(upload_to='covers/%y/%m/%d/')
    category = models.CharField(max_length=100, default='Category')
    price = models.TextField(max_length=100, default="0.00")
    available = models.BooleanField(default=True)
    description = models.TextField()
    section = models.CharField(max_length=100, default='General')

    
    def __str__(self):
        return self.title