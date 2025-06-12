from django.urls import path
from .views import ScoreReportView, TopGroupView, ScoreLookupView

urlpatterns = [
    path('report/', ScoreReportView.as_view(), name='score-report'),
    path('top-group/', TopGroupView.as_view(), name='top-group'),
    path('lookup/', ScoreLookupView.as_view(), name='lookup'),
]

