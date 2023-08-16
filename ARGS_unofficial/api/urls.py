from django.urls import path
from .views import (
    test,
    add_csv_data,
    add_csv_data_colors,
    remove_csv_data,
    get_classes,
    get_class_names_api,
    get_lesson_names_api,
    get_class_version_api,
    get_class_colors_api,
)

urlpatterns = [
    path("", test),
    path("add_file/", add_csv_data, name="add_file"),
    path("add_file_colors/", add_csv_data_colors, name="add_colors"),
    path("delete_file/", remove_csv_data, name="delete_file"),
    path("get_classes/", get_classes, name="get_classes"),
    path("get_all_classes/", get_class_names_api, name="get_all_classes"),
    path("get_all_lessons/", get_lesson_names_api, name="get_all_lessons"),
    path("get_class_version/", get_class_version_api, name="get_class_version"),
    path("get_class_colors/", get_class_colors_api, name="get_class_colors"),
]
