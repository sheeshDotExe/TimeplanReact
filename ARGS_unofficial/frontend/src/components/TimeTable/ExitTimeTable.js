import React from 'react'

const resetTimeTable = () => {
    const className = localStorage.getItem("class_name");

    if (className === undefined) {return}

    localStorage.removeItem("TimePlanData");
    localStorage.removeItem("version");
    localStorage.removeItem("class_name");
    localStorage.removeItem("colors");
    location.reload();
}

export const ExitTimeTable = () => {
  return (
    <div className='fixed top-6 right-12'>
        <button className='text-red-600 font-bold' onClick={()=>{
            resetTimeTable();
        }}>
            X
        </button>
    </div>
  )
}
