from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models    
# Create your models here.

# for users 
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username


# for subscribtion
class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email