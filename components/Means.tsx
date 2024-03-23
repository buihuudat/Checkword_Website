import React from "react";

const Means = ({ means }: { means: any[] }) => {
  return (
    <div>
      {means.map((mean, index) => (
        <div key={index}>
          <div className="flex space-x-3 items-start flex-col mb-3">
            <div>
              Definition:
              <span className="text-xl font-semibold">
                {mean?.definitions[0]?.definition}
              </span>
            </div>
            <div>
              Example:
              <span className="text-sm font-semibold">
                {mean?.definitions[0]?.example}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Means;
