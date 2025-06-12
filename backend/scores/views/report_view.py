from rest_framework.views import APIView
from rest_framework.response import Response
from scores.models import StudentScore

class ScoreReportView(APIView):
    def get(self, request):
        subjects = [
            'toan', 'ngu_van', 'ngoai_ngu',
            'vat_li', 'hoa_hoc', 'sinh_hoc',
            'lich_su', 'dia_li', 'gdcd'
        ]
        report = {}

        for subject in subjects:
            report[subject] = {
                '>=8': StudentScore.objects.filter(**{f"{subject}__gte": 8}).count(),
                '6-8': StudentScore.objects.filter(**{f"{subject}__lt": 8, f"{subject}__gte": 6}).count(),
                '4-6': StudentScore.objects.filter(**{f"{subject}__lt": 6, f"{subject}__gte": 4}).count(),
                '<4': StudentScore.objects.filter(**{f"{subject}__lt": 4}).count(),
            }

        return Response(report)
