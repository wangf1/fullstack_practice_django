from .views import RoomListCreateView
from django.urls import path


urlpatterns = [
    path("rooms/", RoomListCreateView.as_view()),
]
