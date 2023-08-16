from __future__ import annotations
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from .forms import UploadFileForm
from .data_model import (
    handle_uploaded_file,
    handle_uploaded_file_colors,
    delete_csv_file,
    get_files,
    get_class_names,
    get_lesson_names,
    get_class_version,
    get_class_colors
)
from .serializers import TimeSerializer


def remove_csv_data(request):
    if request.method == "POST":
        file_path = request.POST.get("file_name", None)
        if file_path:
            delete_csv_file(file_path)
            return render(request, "delete_file.html", {"deleted_file_url": "True"})
    return render(request, "delete_file.html")


def add_csv_data(request):
    if request.method == "POST":
        if not request.user.is_superuser:
            return HttpResponse("You are not allowed to sowwy O:")
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            handle_uploaded_file(request.FILES["file"])
            return render(request, "upload_file.html", {"uploaded_file_url": "True"})
    return render(request, "upload_file.html")

def add_csv_data_colors(request):
    if request.method == "POST":
        if not request.user.is_superuser:
            return HttpResponse("You are not allowed to sowwy O_O")
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            handle_uploaded_file_colors(request.FILES["file"])
            return render(request, "upload_colors.html", {"uploaded_file_url": "True"})
    return render(request, "upload_colors.html")

def get_class_names_api(request):
    if request.method == "GET":
        classes = get_class_names()
        return JsonResponse(
            {"results": classes},
            json_dumps_params={"ensure_ascii": False},
        )
    return HttpResponse("no")


def get_lesson_names_api(request):
    if request.method == "GET":
        lessons = get_lesson_names(request.GET.get("class_name", ""))
        return JsonResponse(
            {"results": lessons},
            json_dumps_params={"ensure_ascii": False},
        )
    return HttpResponse("no")


def get_classes(request):
    if request.method == "GET":
        klasse = request.GET.get("class", None)
        if not klasse:
            return HttpResponseBadRequest("Invalid class")

        valg_fag = request.GET.get("elective_subjects", None)

        fag, version = get_files(klasse, valg_fag.split(",") if valg_fag else None)
        return JsonResponse(
            {
                "results": list(TimeSerializer(time).data for time in fag),
                "version": version,
            },
            json_dumps_params={"ensure_ascii": False},
        )
    return HttpResponse("no")


def get_class_version_api(request):
    if request.method == "GET":
        klasse = request.GET.get("class", None)

        if not klasse:
            return HttpResponseBadRequest("Invalid class")

        version = get_class_version(klasse)
        return JsonResponse(
            {"results": version},
        )
    return HttpResponse("no")

def get_class_colors_api(request):
    if request.method == "GET":
        klasse = request.GET.get("class", None)

        if not klasse:
            return HttpResponseBadRequest("Invalid class")
    
        result = get_class_colors(klasse)
        return JsonResponse(
            {"results": result},
        )
    return HttpResponse("no")

def test(request):
    return HttpResponse("hello")
