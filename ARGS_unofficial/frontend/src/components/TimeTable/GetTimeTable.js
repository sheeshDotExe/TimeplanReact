import React from "react";
import { updateTimeTableData } from "./Utils.js";

export const GetTimeTable = ({ className, lessons }) => {
  const setTimeTableData = () => {
    // cookie stuff
  };
  const getTimeTableData = async () => {
    localStorage.setItem("class_name", className);
    localStorage.setItem("lessons", JSON.stringify(lessons));
    updateTimeTableData();
  };

  return (
    <div>
      <button className="border border-black p-10 font-bold hover:bg-slate-400" onClick={() => getTimeTableData()}>Generer Timeplan</button>
    </div>
  );
};
