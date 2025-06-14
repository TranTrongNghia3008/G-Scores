from django.urls import path
from .views import ScoreReportView, TopGroupView, ScoreLookupView, StatsOverviewView, TopNationalView, ScoreDistributionView, AIAnalysisView, UploadCSVView

urlpatterns = [
    path('report/', ScoreReportView.as_view(), name='score-report'),
    path('top-group/', TopGroupView.as_view(), name='top-group'),
    path('lookup/', ScoreLookupView.as_view(), name='lookup'),
    path('stats/', StatsOverviewView.as_view(), name='dashboard-stats'),
    path('top-national/', TopNationalView.as_view(), name='dashboard-top'),
    path('distribution/', ScoreDistributionView.as_view(), name='dashboard-distribution'),
    path('ai-analysis/', AIAnalysisView.as_view(), name="ai-analysis"),
    path('upload/', UploadCSVView.as_view(), name='upload_csv'),
]

