# admin.py
from django.contrib import admin
from .models import UserPassword

@admin.register(UserPassword)
class UserPasswordAdmin(admin.ModelAdmin):
    list_display = ['username', 'website_name', 'website_url', 'user']
