from rest_framework.views import APIView
from rest_framework.response import Response
from scores.models import StudentScore
from collections import Counter

LANGUAGE_LABELS = {
    "N1": "Tiếng Anh",
    "N2": "Tiếng Nga",
    "N3": "Tiếng Pháp",
    "N4": "Tiếng Trung",
    "N5": "Tiếng Đức",
    "N6": "Tiếng Nhật",
    "N7": "Tiếng Hàn",
}

class ScoreDistributionView(APIView):
    def get(self, request):
        subject = request.GET.get("subject")

        if subject.startswith("ngoai_ngu_"):
            code = subject.split("_")[-1].upper()
            if code not in LANGUAGE_LABELS:
                return Response({"error": "Invalid foreign language code"}, status=400)
            
            scores = StudentScore.objects.filter(ma_ngoai_ngu=code).exclude(ngoai_ngu__isnull=True).values_list("ngoai_ngu", flat=True)
        else:
            if subject not in [f.name for f in StudentScore._meta.fields]:
                return Response({"error": "Invalid subject"}, status=400)
            scores = StudentScore.objects.exclude(**{f"{subject}__isnull": True}).values_list(subject, flat=True)

        distribution = dict(Counter(scores))
        return Response(distribution)
