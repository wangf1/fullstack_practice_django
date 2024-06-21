from django.contrib.auth.models import User
from rest_framework import serializers

from api.models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'password', ]
        extra_kwargs = {
            'password': {'write_only': True, },
            'url': {'view_name': 'user-detail', 'lookup_field': 'username'},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
        extra_kwargs = {
            "author": {"read_only": True}
        }
