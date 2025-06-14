# scores/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
import csv, io
from scores.models import StudentScore

class UploadCSVView(APIView):
    def post(self, request):
        csv_file = request.FILES.get('file')
        if not csv_file:
            return Response({"error": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        decoded_file = csv_file.read().decode('utf-8')
        reader = csv.DictReader(io.StringIO(decoded_file))

        StudentScore.objects.all().delete()
        batch_size = 5000
        students = []

        for idx, row in enumerate(reader, start=1):
            student = StudentScore(
                sbd=row['sbd'],
                toan=self.to_float(row['toan']),
                ngu_van=self.to_float(row['ngu_van']),
                ngoai_ngu=self.to_float(row['ngoai_ngu']),
                vat_li=self.to_float(row['vat_li']),
                hoa_hoc=self.to_float(row['hoa_hoc']),
                sinh_hoc=self.to_float(row['sinh_hoc']),
                lich_su=self.to_float(row['lich_su']),
                dia_li=self.to_float(row['dia_li']),
                gdcd=self.to_float(row['gdcd']),
                ma_ngoai_ngu=row['ma_ngoai_ngu'] or None
            )
            students.append(student)

            if len(students) >= batch_size:
                StudentScore.objects.bulk_create(students)
                students = []

        if students:
            StudentScore.objects.bulk_create(students)

        return Response({"message": f"✅ Imported {idx} records successfully."})

    def to_float(self, value):
        try:
            return float(value)
        except (ValueError, TypeError):
            return None
