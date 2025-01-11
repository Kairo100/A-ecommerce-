
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth import get_user_model
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Subscriber
import json
from django.db.models import Q

# for user views
User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

# for subsribtion views
@api_view(['POST'])
@permission_classes([AllowAny])  
def subscribe(request):
    try:
        email = request.data.get('email')
        if not email:
            return Response({'success': False, 'message': 'Email is required'}, status=400)

        # Validate email format
        try:
            validate_email(email)
        except ValidationError:
            return Response({'success': False, 'message': 'Invalid email format'}, status=400)

        # Check for duplicates
        if Subscriber.objects.filter(email=email).exists():
            return Response({'success': False, 'message': 'Email already subscribed'}, status=409)

        # Save the subscriber
        Subscriber.objects.create(email=email)
        return Response({'success': True, 'message': 'Subscription successful!'}, status=201)
    except Exception as e:
        return Response({'success': False, 'message': 'An error occurred'}, status=500)