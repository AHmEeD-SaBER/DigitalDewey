from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    cover = models.ImageField(upload_to='covers/', default='/static/imgs/Books/(43).jpg')
    category = models.CharField(max_length=100, default='Category')
    price = models.TextField(max_length=10, default="0.00")
    available = models.BooleanField(default=True)
    # description = models.TextField()
    description = models.TextField(blank=True, null=True)
    section = models.CharField(max_length=100, default='General')
    
    def __str__(self):
        return self.title