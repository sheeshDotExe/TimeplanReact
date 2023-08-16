import React, { useState, useEffect } from "react";

export const ClassChoice = ({ onClassChange }) => {
  const [classes, setClasses] = useState([]);

  const getClasses = async () => {
    const allClassesResponse = await fetch("api/get_all_classes");
    const allClassesJson = await allClassesResponse.json();
    const allClasses = allClassesJson["results"];
    setClasses(allClasses);
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div>
      <h3 className="font-bold text-2xl mb-6">Velg klasse:</h3>
      {classes.length > 0 && (
        <div className="mb-6 flex flex-row justify-center">
          {classes.map((className, index) => {
            return (
              <div key={index}>
                <button className="border border-black p-10 font-bold hover:bg-slate-400 focus:bg-slate-400"
                  id={className}
                  name="class_name"
                  onClick={() => {
                    onClassChange(className);
                  }}
                >
                  {className}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
