from django.db import models


class Location(models.Model):
    name = models.CharField(max_length=200)
    coordinatesX = models.DecimalField(max_digits=9, decimal_places=6)
    coordinatesY = models.DecimalField(max_digits=9, decimal_places=6)
    description = models.TextField()
    image = models.ImageField()

