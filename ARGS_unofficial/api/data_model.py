from __future__ import annotations
from .models import Time, Version, CodeToColor, ColorMap


def get_data_base() -> dict:
    return Time.objects.all()


def get_class_names() -> list[str]:
    klasser = set()
    for time in get_data_base():
        if time.klassekode not in klasser:
            klasser.add(time.klassekode)
    return list(klasser)


def get_lesson_names(class_name: str) -> list[str]:
    lesson_names = {}
    for lesson in get_data_base():
        if lesson.mandatory:
            continue
        if (
            lesson.full_class_name not in lesson_names
            and lesson.klassekode == class_name
        ):
            lesson_names[lesson.full_class_name] = lesson.klasse

    return lesson_names


def delete_csv_file(file_name: str) -> None:
    for time in Time.objects.all():
        if time.original_file == file_name:
            time.delete()
    print("done deleteing")


def get_files(klasse_selected: str = None, time_koder: list[str] = None):
    timer = []
    version = None
    if klasse_selected:
        class_version_object = Version.objects.get(klasse=klasse_selected)
        if class_version_object:
            version = class_version_object.versjon

    for time in get_data_base():
        if klasse_selected and time.klassekode != klasse_selected:
            continue
        if not time.mandatory and time_koder and time.klasse not in time_koder:
            continue

        timer.append(time)

    return timer, version


def get_class_version(klasse: str) -> int:
    version = Version.objects.get(klasse=klasse)
    if not version:
        return None
    return version.versjon


def get_class_colors(klasse: str) -> dict:
    class_color_map = ColorMap.objects.filter(klasse=klasse).first()
    if not class_color_map:
        return None

    class_code_color_map = {}

    for class_color in class_color_map.class_colors.all():
        class_code_color_map[class_color.klassekode] = class_color.color

    return class_code_color_map


def handle_uploaded_file_colors(f):
    file_name = str(f)
    data = ""
    for chunk in f.chunks():
        data += chunk.decode("utf-8")
    entries = list(map(lambda x: x.strip("\r"), data.split("\n")))

    updated_clases = set()
    other_timer = get_data_base()
    for entry in entries:
        if len(entry.split(",")) != 3:
            print("error", entry)
            return
        (klasse, klassekode, farge) = entry.split(",")

        class_color_map = ColorMap.objects.filter(klasse=klasse).first()

        if not class_color_map:
            class_color_map = ColorMap(klasse=klasse)
            class_color_map.save()

        class_code_color = class_color_map.class_colors.filter(
            klassekode=klassekode
        ).first()

        if not class_code_color:
            class_code_color = CodeToColor(klassekode=klassekode, color=farge)
            class_code_color.save()
            class_color_map.class_colors.add(class_code_color)
            if klasse not in updated_clases:
                updated_clases.add(klasse)

        if farge != class_code_color.color:
            class_code_color.color = farge
            class_code_color.save(update_fields=["color"])
            if klasse not in updated_clases:
                updated_clases.add(klasse)

    all_updates = Version.objects.all()
    version_map = {update.klasse: update for update in all_updates}

    for klasse in updated_clases:
        if klasse not in version_map:
            continue
        version_map[klasse].versjon += 1
        version_map[klasse].save(update_fields=["versjon"])
        print("updated", klasse, "to version", version_map[klasse].versjon)


def handle_uploaded_file(f):
    file_name = str(f)
    data = ""
    for chunk in f.chunks():
        data += chunk.decode("utf-8")
    entries = list(map(lambda x: x.strip("\r"), data.split("\n")))

    updated_clases = set()
    other_timer = get_data_base()
    for entry in entries:
        if len(entry.split(",")) != 10:
            print("error", entry)
            return
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

        if any(
            all(
                [
                    time_object.start_tid == other_time_object.start_tid,
                    time_object.slutt_tid == other_time_object.slutt_tid,
                    time_object.lærer == other_time_object.lærer,
                    time_object.dag == other_time_object.dag,
                    time_object.klassekode == other_time_object.klassekode,
                ]
            )
            for other_time_object in other_timer
        ):
            continue

        if klasse not in updated_clases:
            updated_clases.add(klasse)

        time_object.save()

        print("added", time_object)

    all_updates = Version.objects.all()
    version_map = {update.klasse: update for update in all_updates}

    for klasse in updated_clases:
        if klasse not in version_map:
            version = Version(klasse=klasse)
            version.save()
            print("created version for", klasse)
        else:
            version_map[klasse].versjon += 1
            version_map[klasse].save(update_fields=["versjon"])
            print("updated", klasse, "to version", version_map[klasse].versjon)
