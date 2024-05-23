from django.db import models
from django.db import models
from django.conf import settings

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    cover = models.ImageField(upload_to='covers/', default='/static/imgs/Books/(43).jpg')
    category = models.CharField(max_length=100, default='Category')
    price = models.TextField(max_length=10, default="0.00")
    available = models.CharField(default='Available', max_length=100,blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    section = models.CharField(max_length=100, default='General',blank=True, null=True)
    
    def __str__(self):
        return self.title
    
class BorrowedBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='borrowings')
    borrower = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='borrowed_books')

    def __str__(self):
        return f'{self.book.title} borrowed by {self.borrower.username}'
    
# class LastVisitedBook(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='last_visited_books')
#     book = models.ForeignKey(Book, on_delete=models.CASCADE)
#     visited_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         ordering = ['-visited_at']

#     def __str__(self):
#         return f'{self.book.title} visited by {self.user.username}'