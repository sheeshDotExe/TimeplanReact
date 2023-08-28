import React, { useEffect, useState } from "react";
import { TimeTableDay } from "./TimeTableDay.js";
import { ExitTimeTable } from "./ExitTimeTable.js";
import { DaySelection } from "./DaySelection.js";

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
    setCurrentDay(currentTime.getDay()-1);
  }, []);

  const setActiveDay = React.useCallback((newDay)=>{
    setCurrentDay(newDay);
  }, [currentDay])

  return (
    <div>
      {allDays.length > 0 && (
        <div>
          <div className="flex flex-row gap-1 py-4 items-center justify-center">
            {allDays.map((day, index) => {
                return (
                  <div>
                    <DaySelection TableData={day} currentDay={currentDay} thisDay={index} setCurrentDay={setActiveDay}/>
                  </div>
                );
              })}
          </div>
          <div className="flex flex-row justify-center">
            {allDays.map((day, index) => {
              return (
                <div>
                  <TimeTableDay TableData={day} ColorMap={ColorData} currentDay={currentDay} thisDay={index}/>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <ExitTimeTable/>
    </div>
  );
};
