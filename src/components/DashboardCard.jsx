import React from "react";
import Loader from "./Loader";

const DashboardCard = ({ title, count, loading }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-2 text-3xl md:text-4xl font-extrabold">
        {loading ? <Loader /> : count}
      </div>
      <div className="font-normal text-gray-500 ">{title}</div>
    </div>
  );
};

export default DashboardCard;
