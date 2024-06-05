from django.db import models
from AppUser.models import User
# Create your models here.

class UserPassword(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=500)
    website_name = models.CharField(max_length=30, blank=True)
    website_url = models.CharField(max_length=100, blank=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=False, blank=False)
