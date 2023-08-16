from rest_framework import serializers
import uuid


class TimeSerializer(serializers.Serializer):
    klassekode = serializers.CharField(max_length=30)
    lærer = serializers.CharField(max_length=30)
    klasserom = serializers.CharField(max_length=30)
    klasse = serializers.CharField(max_length=30)
    dag = serializers.CharField(max_length=30)
    start_tid = serializers.CharField(max_length=30)
    slutt_tid = serializers.CharField(max_length=30)
    ekstern_id = serializers.UUIDField()
    original_file = serializers.CharField(max_length=30)
    mandatory = serializers.BooleanField(default=False)
    full_class_name = serializers.CharField(max_length=30, default="No name")


class VersionSerializer(serializers.Serializer):
    klasse = serializers.CharField(max_length=30)
    versjon = serializers.IntegerField(default=0)

class CodeToColorSerializer(serializers.Serializer):
    klassekode = serializers.CharField(max_length=30)
    color = serializers.CharField(max_length=30)