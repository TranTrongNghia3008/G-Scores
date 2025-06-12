from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from scores.models import StudentScore
from scores.serializers.student_serializer import StudentScoreSerializer

class ScoreLookupView(APIView):
    def get(self, request):
        sbd = request.query_params.get("sbd")
        if not sbd:
            return Response({"error": "Missing registration number (sbd)."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student = StudentScore.objects.get(sbd=sbd)
            serializer = StudentScoreSerializer(student)
            return Response(serializer.data)
        except StudentScore.DoesNotExist:
            return Response({"error": "Student not found."}, status=status.HTTP_404_NOT_FOUND)
