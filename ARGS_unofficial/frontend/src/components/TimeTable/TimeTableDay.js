import React, { useEffect, useState } from "react";

const ELEMENT_SCALING_FACTOR = 6; // rem per hour

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
    <div className="flex flex-row items-center gap-2">
      <p>{className}</p>
      <p>{classCode}</p>
      <p>{classRoom}</p>
      <p>
        {teacherFirstName} {teacherLastName}
      </p>
    </div>
  );
};

const Lesson = ({ Data, ColorMap, nextData }) => {
  const [teacherFirstName, setTeacherFirstName] = useState("");
  const [teacherLastName, setTeacherLastName] = useState("");
  const [styling, setStyling] = useState({
    height: "0px",
    "margin-bottom": "0px",
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

    const current = new Date();
    const dateTimeStart = new Date(
      `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()} ${Data.begin}`
    );
    const dateTimeEnd = new Date(
      `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()} ${Data.end}`
    );
    const heightMath =
      ((dateTimeEnd - dateTimeStart) / (1000 * 60 * 60)) *
      ELEMENT_SCALING_FACTOR;

    let paddingBottom = 0;

    if (nextData !== null) {
      const dateTimeNext = new Date(
        `${current.getFullYear()}-${
          current.getMonth() + 1
        }-${current.getDate()} ${nextData.begin}`
      );

      const paddingMath =
        ((dateTimeNext - dateTimeEnd) / (1000 * 60 * 60)) *
        ELEMENT_SCALING_FACTOR;
      paddingBottom = paddingMath;
      if (paddingMath === 0) {
        setTailWindStyling(
          "relative flex flex-col items-center justify-center border-t-2 border-solid border-black"
        );
      }
    }

    let color = "#ffffff";

    if (ColorMap !== null && Data.classCode in ColorMap) {
      color = ColorMap[Data.classCode];
    }

    setStyling({
      height: `${heightMath}rem`,
      "margin-bottom": `${paddingBottom}rem`,
      "background-color": color,
    });
  }, [Data, nextData]);

  return (
    <div className={tailWindStyling} style={styling}>
      <TimeDisplay position="absolute z-10 px-1 py-0.5 -top-3 left-0 bg-slate-400 text-xs text-center" time={Data.begin} />
      <InfoDisplay
        className={Data.className}
        classCode={Data.classCode}
        classRoom={Data.classRoom}
        teacherFirstName={teacherFirstName}
        teacherLastName={teacherLastName}
      />
      <TimeDisplay position="absolute z-10 px-1 py-0.5 -bottom-3 right-0 bg-slate-400 text-xs text-center" time={Data.end} />
      <hr />
    </div>
  );
};

export const TimeTableDay = ({ TableData, ColorMap}) => {
  return (
    <div className="min-h-full" style={{"background-color": "#CCCCCC"}}>
      {TableData.length > 0 && (
        <div className="min-h-screen flex flex-col border-2 border-solid border-black">
          <h2 className="text-center font-bold px-32 py-6 mb-6 bg-slate-400">
            {TableData[0].day}
          </h2>
          {TableData.map((lession, index) => {
            return (
              <Lesson
                Data={lession}
                ColorMap={ColorMap}
                nextData={
                  index < TableData.length - 1 ? TableData[index + 1] : null
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
