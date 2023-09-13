import React, { Component, useEffect, useState } from "react";
import { TimeTableChoice } from "./TimeTableChoice.js";
import { TimeTable } from "./TimeTable/TimeTable.js";
import { checkVersion } from "./TimeTable/Utils.js";

const getWeekNumber = () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  var weekNumber = Math.ceil(days / 7);
  return weekNumber;
};

export const HomePage = () => {
  const [timeTableData, setTimeTableData] = useState(null);
  const [colorData, setColorData] = useState({});

  const getTimeTableData = async () => {
    document.title = `Args Timeplan Uke-${getWeekNumber()}`;
    await checkVersion();
    setTimeTableData(localStorage.getItem("TimePlanData"));
    const colors = localStorage.getItem("colors");
    if (colors) {
      setColorData(JSON.parse(colors));
    }
  };

  useEffect(() => {
    getTimeTableData();
  }, []);

  return (
    <div className="max-w-5xl overflow-hidden flex flex-col m-6 items-center gap-12 2xl:max-w-none">
      <h2 className="text-3xl font-bold">ARGS Timeplan</h2>
      {!timeTableData ? (
        <div>
          <p className="mb-24">
            OBS: Hvis du ikke ser klassen din under, så betyr det at din
            timeplan ikke er lagt inn i systemet enda.
          </p>
          <TimeTableChoice />
        </div>
      ) : (
        <TimeTable TimeTableData={timeTableData} ColorData={colorData} />
      )}
    </div>
  );
};
