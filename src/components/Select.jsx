import React, { useId } from "react";

const Select = ({ label, options=[], className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && 
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      }

      <select {...props} className="" id={id} ref={ref}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
