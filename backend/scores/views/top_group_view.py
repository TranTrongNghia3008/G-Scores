from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from scores.models import StudentScore
from django.db.models import F, FloatField, ExpressionWrapper, Value, Sum
from django.db.models.functions import Coalesce
from scores.serializers.student_serializer import StudentScoreSerializer

GROUPS = {
    "A": ["toan", "vat_li", "hoa_hoc"],
    "A1": ["toan", "vat_li", "ngoai_ngu"],
    "B": ["toan", "hoa_hoc", "sinh_hoc"],
    "C": ["ngu_van", "lich_su", "dia_li"],
    "D01": ["toan", "ngu_van", "ngoai_ngu"],
    "D02": ["toan", "ngu_van", "ngoai_ngu"],
    "D03": ["toan", "ngu_van", "ngoai_ngu"],
    "D04": ["toan", "ngu_van", "ngoai_ngu"],
    "D05": ["toan", "ngu_van", "ngoai_ngu"],
    "D06": ["toan", "ngu_van", "ngoai_ngu"],
    "D07": ["toan", "hoa_hoc", "ngoai_ngu"],
}

# Mã ngoại ngữ theo từng khối
FOREIGN_LANG_CODES = {
    "D02": "N2",
    "D03": "N3",
    "D04": "N4",
    "D05": "N5",
    "D06": "N6",
}

class TopGroupView(APIView):
    def get(self, request):
        group = request.query_params.get("group")

        if not group or group not in GROUPS:
            return Response({"error": "Invalid or missing group parameter."}, status=status.HTTP_400_BAD_REQUEST)

        subjects = GROUPS[group]

        queryset = StudentScore.objects.all()

        if group in FOREIGN_LANG_CODES:
            queryset = queryset.filter(ma_ngoai_ngu=FOREIGN_LANG_CODES[group])

        total_score_expr = sum(Coalesce(F(subject), Value(0.0)) for subject in subjects)
        queryset = queryset.annotate(
            total_score=ExpressionWrapper(total_score_expr, output_field=FloatField())
        ).order_by("-total_score")[:10] 
        
        serializer = StudentScoreSerializer(queryset, many=True, context={"group_subjects": subjects})
        return Response(serializer.data, status=status.HTTP_200_OK)
