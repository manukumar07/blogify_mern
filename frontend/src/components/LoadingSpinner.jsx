import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FFFFFFCC] z-50">
      <div
        className="w-16 h-16 border-4 border-t-[#3366FF] border-b-[#00CCCC] rounded-full animate-spin"
        style={{
          borderLeftColor: "#6633CC",
          borderRightColor: "#3366FF",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
