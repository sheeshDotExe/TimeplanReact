import React, { useEffect, useState } from "react";
import { TimeTableDay } from "./TimeTableDay.js";
import { ExitTimeTable } from "./ExitTimeTable.js";

export const TimeTable = ({ TimeTableData, ColorData }) => {
  // process data group by day
  const [allDays, setAllDays] = useState([]);
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    if (!TimeTableData) {
      return;
    }
    const timeTableData = JSON.parse(TimeTableData);
    const days = {};
    for (const entry of timeTableData) {
      const [day, teacher, classCode, begin, end, classRoom, className] = [
        entry.dag,
        entry.lærer,
        entry.klasse,
        entry.start_tid,
        entry.slutt_tid,
        entry.klasserom,
        entry.klassekode,
      ];

      const classObject = {
        day: day,
        teacher: teacher,
        classCode: classCode,
        begin: begin,
        end: end,
        classRoom: classRoom,
        className: className,
      };

      if (day in days) {
        days[day].push(classObject);
      } else {
        days[day] = new Array(classObject);
      }
    }

    setAllDays(Object.values(days));
    const currentTime = new Date()
    setCurrentDay(currentTime.getDay());
  }, []);

  return (
    <div>
      {allDays.length > 0 && (
        <div className="flex flex-row">
          {allDays.map((day, index) => {
            return (
              <div>
                <TimeTableDay TableData={day} ColorMap={ColorData} currentDay={currentDay-1} thisDay={index}/>
              </div>
            );
          })}
        </div>
      )}
      <ExitTimeTable/>
    </div>
  );
};
