from django.contrib import admin
from .models import StudentScore

@admin.register(StudentScore)
class StudentScoreAdmin(admin.ModelAdmin):
    list_display = (
        'sbd', 'toan', 'ngu_van', 'ngoai_ngu',
        'vat_li', 'hoa_hoc', 'sinh_hoc',
        'lich_su', 'dia_li', 'gdcd', 'ma_ngoai_ngu',
    )
    search_fields = ('sbd',)
    list_per_page = 100 
