import React from "react";

const LoadingSpinner = ({ size = "md", message = "Loading..." }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        className={`animate-spin rounded-full border-b-4 border-indigo-600 ${sizeClasses[size]}`}
      ></div>
      {message && <p className="mt-4 text-gray-600 text-sm">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
