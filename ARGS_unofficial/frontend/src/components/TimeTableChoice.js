import React, { useEffect } from "react";
import { useState } from "react";
import { ClassChoice } from "./ClassChoices.js";
import { LessonChoices } from "./LessonChoices.js";
import { GetTimeTable } from "./TimeTable/GetTimeTable.js";

export const TimeTableChoice = () => {
  const [activeClassChoice, setClassChoice] = useState("");
  const [activeLessonChoices, setActiveLessonChoices] = useState([]);

  const onClassChange = React.useCallback((classChoice) => {
    const prev = document.getElementById(activeClassChoice);
    if (prev) {
      prev.style.backgroundColor = "white";
    }
    const active = document.getElementById(classChoice);
    if (active) {
      active.style.backgroundColor = "grey";
    }
    setClassChoice(classChoice);
  }, [activeClassChoice]);

  const addLessonChoice = React.useCallback((lesson) => {
    setActiveLessonChoices((choices) => [...choices, lesson]);
  }, []);

  const removeLessonChoice = React.useCallback((lesson) => {
    setActiveLessonChoices((choices) =>
      choices.filter((choice) => choice !== lesson)
    );
  }, []);

  return (
    <div className="text-center flex flex-col gap-12">
      <ClassChoice onClassChange={onClassChange} />
      <LessonChoices
        activeClassChoice={activeClassChoice}
        addLessonChoice={addLessonChoice}
        removeLessonChoice={removeLessonChoice}
      />
      <GetTimeTable
        className={activeClassChoice}
        lessons={activeLessonChoices}
      />
    </div>
  );
};
