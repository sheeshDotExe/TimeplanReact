import React, { useEffect, useState } from "react";

const ELEMENT_SCALING_FACTOR = 6; // rem per hour

const moment = require("moment");

const TimeDisplay = ({ time, position }) => {
  return <div className={position}>{time}</div>;
};

const InfoDisplay = ({
  className,
  classCode,
  classRoom,
  teacherFirstName,
  teacherLastName,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center gap-2 px-2">
        <p>{className}</p>
        <p className="font-bold">{classCode}</p>
        <p>{classRoom}</p>
      </div>
      <hr className=" opacity-20"></hr>
      <div>
        <p>
          {teacherFirstName} {teacherLastName}
        </p>
      </div>
    </div>
  );
};

const Lesson = ({ Data, ColorMap, previousData }) => {
  const [teacherFirstName, setTeacherFirstName] = useState("");
  const [teacherLastName, setTeacherLastName] = useState("");
  const [styling, setStyling] = useState({
    height: "0rem",
    "margin-top": "0rem",
  });
  const [tailWindStyling, setTailWindStyling] = useState(
    "relative flex flex-col items-center justify-center border-y-2 border-solid border-black"
  );

  useEffect(() => {
    if (!Data) {
      return;
    }
    const teacherSplitName = Data.teacher.split(":");
    setTeacherFirstName(teacherSplitName[0]);
    setTeacherLastName(teacherSplitName[1]);

    const current = new moment();
    const dateTimeStart = new moment(
      `${current.year()}-${current.month() + 1}-${current.date()} ${
        Data.begin
      }`,
      "YYYY-MM-DD HH:mm"
    );
    const dateTimeEnd = new moment(
      `${current.year()}-${current.month() + 1}-${current.date()} ${Data.end}`,
      "YYYY-MM-DD HH:mm"
    );
    const heightMath =
      ((dateTimeEnd - dateTimeStart) / (1000 * 60 * 60)) *
      ELEMENT_SCALING_FACTOR;

    let paddingTop = 0;

    if (previousData !== null) {
      const dateTimePrevious = new moment(
        `${current.year()}-${current.month() + 1}-${current.date()} ${
          previousData.end
        }`,
        "YYYY-MM-DD HH:mm"
      );

      const paddingMath =
        ((dateTimeStart - dateTimePrevious) / (1000 * 60 * 60)) *
        ELEMENT_SCALING_FACTOR;
      paddingTop = paddingMath;
      if (paddingMath === 0) {
        setTailWindStyling(
          "relative flex flex-col items-center justify-center border-t-2 border-solid border-black"
        );
      }
    } else {
      const dateTimeEarliestStart = new moment(
        `${current.year()}-${current.month() + 1}-${current.date()} ${"8:30"}`,
        "YYYY-MM-DD HH:mm"
      );
      const paddingMath =
        ((dateTimeStart - dateTimeEarliestStart) / (1000 * 60 * 60)) *
        ELEMENT_SCALING_FACTOR;
      paddingTop = paddingMath;
    }

    let color = "#ffffff";

    if (ColorMap !== null && Data.classCode in ColorMap) {
      color = ColorMap[Data.classCode];
    }

    setStyling({
      height: `${heightMath}rem`,
      "margin-top": `${paddingTop}rem`,
      "background-color": color,
    });
  }, [Data, previousData]);

  return (
    <div className={`${tailWindStyling} text-center`} style={styling}>
      <TimeDisplay
        position="absolute z-10 px-1 py-0.5 -top-3 left-0 bg-slate-400 text-xs text-center"
        time={Data.begin}
      />
      <InfoDisplay
        className={Data.className}
        classCode={Data.classCode}
        classRoom={Data.classRoom}
        teacherFirstName={teacherFirstName}
        teacherLastName={teacherLastName}
      />
      <TimeDisplay
        position="absolute z-10 px-1 py-0.5 -bottom-3 right-0 bg-slate-400 text-xs text-center"
        time={Data.end}
      />
      <hr />
    </div>
  );
};

export const TimeTableDay = ({ TableData, ColorMap, currentDay, thisDay }) => {
  const [timeIndicatorPos, setTimeIndicatorPos] = useState(0);
  const [showTimeIndicator, setShowTimeIndicator] = useState(false);
  const [activeDay, setActiveDay] = useState(false);

  const doTimeMath = () => {
    const current = new moment();
    const dateTimeStart = new moment(
      `${current.year()}-${current.month() + 1}-${current.date()} ${"08:30"}`,
      "YYYY-MM-DD HH:mm"
    );
    const dateTimeEnd = new moment();
    const heightMath =
      ((dateTimeEnd - dateTimeStart) / (1000 * 60 * 60)) *
      ELEMENT_SCALING_FACTOR;
    if (heightMath > -2 && heightMath < 9 * ELEMENT_SCALING_FACTOR) {
      setTimeIndicatorPos(heightMath);
      setShowTimeIndicator(true);
    }
  };

  useEffect(() => {
    if (currentDay === thisDay) {
      setActiveDay(true);
      doTimeMath();
      const interval = setInterval(() => {
        doTimeMath();
      }, 1000 * 60);
      return () => clearInterval(interval);
    } else {
      setActiveDay(false);
    }
  }, [currentDay]);

  return (
    <div
      className={`border-2 border-solid border-black ${
        activeDay ? "" : "hidden"
      } md:block`}
      style={{
        "background-color": "#CCCCCC",
        minHeight: `${ELEMENT_SCALING_FACTOR * 9}rem`,
      }}
    >
      {TableData.length > 0 && (
        <div className="flex flex-col">
          <h2 className="text-center font-bold py-6 mb-6 bg-slate-400 px-32 md:px-16 2xl:px-32">
            {TableData[0].day}
          </h2>
          {showTimeIndicator && (
            <div className="relative">
              <div
                className="absolute z-20 w-full h-1 bg-red-600"
                style={{ top: `${timeIndicatorPos}rem` }}
              ></div>
            </div>
          )}
          {TableData.map((lession, index) => {
            return (
              <Lesson
                Data={lession}
                ColorMap={ColorMap}
                previousData={index > 0 ? TableData[index - 1] : null}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
