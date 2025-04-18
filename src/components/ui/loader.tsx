import * as React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
    </div>
  );
};