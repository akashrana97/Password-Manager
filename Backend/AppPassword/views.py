# views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import UserPassword
from .serializers import UserPasswordSerializer
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status

class UserPasswordViewSet(viewsets.ModelViewSet):
    serializer_class = UserPasswordSerializer
    permission_classes = [IsAuthenticated]
    queryset = UserPassword.objects.all()  # Define the queryset attribute

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)  # Ensure users can only access their own data

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Ensure the user is set correctly

    def perform_update(self, serializer):
        instance = self.get_object()
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to update this record.")
        serializer.save(user=self.request.user)  # Ensure the user is set correctly

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this record.")
        
        # Serialize the instance before deleting it
        response_data = UserPasswordSerializer(instance).data
        self.perform_destroy(instance)
        return Response(response_data, status=status.HTTP_200_OK)