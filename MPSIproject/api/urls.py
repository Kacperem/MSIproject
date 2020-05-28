from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers, serializers, viewsets
from .views import LocationViewSet, loginEndpoint, register, image

# from api.views


router = routers.DefaultRouter()
router.register(r"^api/locations", LocationViewSet, basename="LocationView")

urlpatterns = [url(r"^", include(router.urls)),  path('api/login', loginEndpoint), path('api/register', register), path('api/image/<str:imagep>', image)]