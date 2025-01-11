from django.db import models
from django.conf import settings



# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# advertisement
class Advertisement(models.Model):
    image = models.ImageField(upload_to='images/')
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

#products
class Products(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
         
    def __str__(self):
        return self.name

#allows multiple images in products

class ProductsImage(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='images/')
    alt_text = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return f"Image for {self.product.name}"

