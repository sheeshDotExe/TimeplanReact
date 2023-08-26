import React from 'react'

export const DaySelection = ({TableData, currentDay, thisDay, setCurrentDay}) => {
  return (
    <div onClick={()=>{setCurrentDay(thisDay)}} className={`block md:hidden px-3 py-6 border-solid border-black border-2 ${currentDay == thisDay ? "bg-slate-400" : ""}`}>{TableData[0].day}</div>
  )
}
