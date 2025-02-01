import React from "react";

const EmptyContent = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src="/images/404.png" className="w-1/2" />
      <p className="mt-3 text-lg">No data found</p>
    </div>
  );
};

export default EmptyContent;
