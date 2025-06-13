from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F, FloatField, ExpressionWrapper, Value
from django.db.models.functions import Coalesce
from scores.models import StudentScore
from scores.serializers.student_serializer import StudentScoreSerializer

class TopNationalView(APIView):
    def get(self, request):
        all_subjects = [
            "toan", "ngu_van", "ngoai_ngu",
            "vat_li", "hoa_hoc", "sinh_hoc",
            "lich_su", "dia_li", "gdcd"
        ]

        total_score_expr = sum(
            Coalesce(F(subject), Value(0.0)) for subject in all_subjects
        )

        queryset = (
            StudentScore.objects.annotate(
                total_score=ExpressionWrapper(total_score_expr, output_field=FloatField())
            )
            .order_by("-total_score")[:5]
        )

        serializer = StudentScoreSerializer(
            queryset,
            many=True,
            context={"group_subjects": all_subjects}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)
