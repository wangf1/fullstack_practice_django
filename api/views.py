from rest_framework import generics

from api.models import Room
from api.serializers import RoomSerializer


# from api.models import Room
# from api.serializers import RoomSerializer

# Create your views here.


class RoomListCreateView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
