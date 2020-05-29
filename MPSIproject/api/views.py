from django.contrib.auth import authenticate
from django.contrib.auth.models import User, Group
from django.http import HttpResponse, HttpResponseNotFound
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from .serializers import LocationSerializer
from .models import Location
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
from django.contrib.auth.models import User
"""
class UserViewSet(viewsets.ModelViewSet):
    serializer_class 
    permission_classes = [permissions.IsAuthenticated]
"""

class LocationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    #queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Location.objects.filter(user_id=self.request.user)
        return queryset

    def create(self, request, *args, **kwargs):
        Location.objects.create(user_id=self.request.user,
                                name=request.data.get("name"),
                                coordinatesX=(request.data.get("coordinatesX")),
                                coordinatesY=(request.data.get("coordinatesY")),
                                description=request.data.get("description"),
                                image=request.data.get("image")
                                )
        return Response(status=204)

    def partial_update(self, request, *args, **kwargs):
        print(vars(request))
        location = Location.objects.filter(id=int(kwargs['pk']), user_id=self.request.user).first()
        if not location:
            return Response(status=404)
        location.name = self.request.data.get("name")
        location.description = self.request.data.get("description")
        location.image = self.request.data.get("image")
        location.save()
        return Response(status=204)

    def delete(self, request,*args, **kwargs):
        location = Location.objects.filter(id=int(kwargs['pk']), user_id=self.request.user).first()
        if not location:
            return Response(status=404)
        location.delete()
        return Response(status=204)

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def loginEndpoint(request):
    username = request.data.get("username")
    password = request.data.get("password")
    return login(username, password)


def login(username, password):
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},
                    status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def register(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    if username is None or password is None or email is None:
        return Response({'error': 'Please provide  username, eamil, password'},
                        status=HTTP_400_BAD_REQUEST)
    User.objects.create_user(username, email, password)
    return login(username, password)



@api_view(["GET"])
@permission_classes((permissions.IsAuthenticated,))
def image(request, image):
    try:
        with open(image, 'rb') as f:
            file_data = f.read()

        # sending response
        response = HttpResponse(file_data, content_type='image/jpeg')
        response['Content-Disposition'] = f'attachment; filename="{image}"'

    except IOError:
        # handle file not exist case here
        response = HttpResponseNotFound('<h1>File not exist</h1>')

    return response

