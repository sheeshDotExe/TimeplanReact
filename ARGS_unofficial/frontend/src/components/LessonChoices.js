import React, { useEffect, useState } from "react";

export const LessonChoices = ({
  activeClassChoice,
  addLessonChoice,
  removeLessonChoice,
}) => {
  const [allLessons, setAllLessons] = useState([]);

  const getAllLessons = async (className) => {
    if (!className) {
      return;
    }
    const allLessonsResponse = await fetch(
      `api/get_all_lessons?class_name=${className}`
    );
    const allLessonsJson = await allLessonsResponse.json();
    const allLessons = allLessonsJson["results"];
    const lessonNames = Object.keys(allLessons);
    const lessonCodes = Object.values(allLessons);
    console.log(lessonNames);
    setAllLessons(
      lessonNames.map((lessonName, i) => ({
        lessonName: lessonName,
        lessonCode: lessonCodes[i],
      }))
    );
  };

  useEffect(() => {
    getAllLessons(activeClassChoice);
  }, [activeClassChoice]);
  return (
    <div>
      {allLessons.length > 0 && (
        <div>
          <p className="font-bold text-2xl">Velg valgfag:</p>
          <div className="p-14">
          <div className="flex flex-row gap-2">
          {allLessons.map(({ lessonName, lessonCode }, index) => {
            return (
              <div key={index}>
                <input className="hidden"
                  type="checkbox"
                  id={lessonName}
                  name="class_name"
                  onChange={(event) => {
                    const label = document.getElementById(lessonCode);
                    if (event.target.checked) {
                      addLessonChoice(lessonCode);
                      label.style.backgroundColor = "grey";
                    } else {
                      removeLessonChoice(lessonCode);
                      label.style = ""
                    }
                  }}
                />
                <label id={lessonCode} className="border border-black p-10 font-bold hover:bg-slate-400" for={lessonName}>{lessonName}</label>
              </div>
            );
          })}
          </div>
          </div>
        </div>
      )}
    </div>
  );
};
