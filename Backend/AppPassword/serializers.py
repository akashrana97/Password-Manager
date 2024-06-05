# serializers.py
from rest_framework import serializers
from .models import UserPassword

class UserPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPassword
        fields = ['id', 'username', 'password', 'website_name', 'website_url']
        extra_kwargs = {
            'password': {'write_only': True}  # Ensure the password is write-only
        }

    def validate(self, data):
        if 'http' not in data['website_url']:
            raise serializers.ValidationError({"website_url": "URL must start with 'http' or 'https'"})
        return data
