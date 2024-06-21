from django.urls import path

from api.views import NoteListCreateView, NoteRetrieveUpdateDestroyView

urlpatterns = [

    path('notes', NoteListCreateView.as_view(), name='note-list-create'),
    path('notes/delete/<int:pk>/', NoteRetrieveUpdateDestroyView.as_view()),
]
