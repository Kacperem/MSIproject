from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Location
from .models import User


class LocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = ['id',  'name', 'coordinatesX', 'coordinatesY', 'description', 'image']

"""
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['']
"""

