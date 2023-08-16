from django.db import models
import uuid

"""
        (
            klasse,
            code,
            full_class_name,
            klasse_rom,
            name,
            last_name,
            day,
            time_start,
            time_end,
            mandatory,
        ) = entry.split(",")
        
        time_object = Time(
            klassekode=klasse,
            lærer=name + ":" + last_name,
            klasserom=klasse_rom,
            klasse=code,
            dag=day,
            start_tid=time_start,
            slutt_tid=time_end,
            original_file=file_name,
            mandatory=(mandatory.lower() == "true"),
            full_class_name=full_class_name,
        )

    ST2A,NOR,Norsk,225,Line,Lindberg,tirsdag,14:45,16:00,True
"""


class Time(models.Model):
    klassekode = models.CharField(max_length=30)
    lærer = models.CharField(max_length=30)
    klasserom = models.CharField(max_length=30)
    klasse = models.CharField(max_length=30)
    dag = models.CharField(max_length=30)
    start_tid = models.CharField(max_length=30)
    slutt_tid = models.CharField(max_length=30)
    ekstern_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    original_file = models.CharField(max_length=30)
    mandatory = models.BooleanField(default=False)
    full_class_name = models.CharField(max_length=30, default="No name")

class CodeToColor(models.Model):
    klassekode = models.CharField(max_length=30)
    color = models.CharField(max_length=30)

class ColorMap(models.Model):
    klasse = models.CharField(max_length=30)
    class_colors = models.ManyToManyField(CodeToColor)


class Version(models.Model):
    klasse = models.CharField(max_length=30)
    versjon = models.IntegerField(default=0)
