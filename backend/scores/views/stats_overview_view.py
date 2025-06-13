from rest_framework.views import APIView
from rest_framework.response import Response
from scores.models import StudentScore

class StatsOverviewView(APIView):
    def get(self, request):
        total_students = StudentScore.objects.count()
        return Response({"total_students": total_students})
