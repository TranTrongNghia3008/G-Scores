from rest_framework import serializers
from scores.models import StudentScore

class StudentScoreSerializer(serializers.ModelSerializer):
    total_score = serializers.SerializerMethodField()

    class Meta:
        model = StudentScore
        fields = [
            "sbd", "toan", "ngu_van", "ngoai_ngu", "vat_li",
            "hoa_hoc", "sinh_hoc", "lich_su", "dia_li",
            "gdcd", "ma_ngoai_ngu", "total_score"
        ]

    def get_total_score(self, obj):
        group_subjects = self.context.get("group_subjects")
        if not group_subjects:
            return None
        total = 0
        for subject in group_subjects:
            total += getattr(obj, subject, 0) or 0
        return round(total, 2)
