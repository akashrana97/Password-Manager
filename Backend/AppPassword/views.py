# views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import UserPassword
from .serializers import UserPasswordSerializer

class UserPasswordViewSet(viewsets.ModelViewSet):
    serializer_class = UserPasswordSerializer
    permission_classes = [IsAuthenticated]
    queryset = UserPassword.objects.all()  # Define the queryset attribute

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)  # Ensure users can only access their own data

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Ensure the user is set correctly

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)  # Ensure the user is set correctly
