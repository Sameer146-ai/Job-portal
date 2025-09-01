import React from "react";

function Loader() {
  return (
    <div>
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800"></div>
      </div>
    </div>
  );
}

export default Loader;
