import csv
from django.core.management.base import BaseCommand
from scores.models import StudentScore

class Command(BaseCommand):
    help = 'Import điểm thi từ CSV'

    def handle(self, *args, **kwargs):
        StudentScore.objects.all().delete()
        self.stdout.write(self.style.WARNING("Đã xóa toàn bộ dữ liệu cũ."))
        file_path = 'diem_thi_thpt_2024.csv'
        batch_size = 5000
        students = []

        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
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
                    self.stdout.write(f'Đã import {idx} dòng...')
                    students = []

            if students:
                StudentScore.objects.bulk_create(students)
                self.stdout.write(f'Đã import {idx} dòng cuối.')

        self.stdout.write(self.style.SUCCESS('✅ Import hoàn tất!'))

    def to_float(self, value):
        try:
            return float(value)
        except (ValueError, TypeError):
            return None
