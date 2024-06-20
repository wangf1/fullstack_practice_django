from rest_framework import serializers

from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        # "__all__" is a special keyword that can be used to represent all fields in the Room model.
        fields = "__all__"
