import React from "react";
import Loader from "./Loader";

const ActionLoader = ({ title }) => {
  return (
    <div className="flex items-center justify-center">
      <Loader />
      <span className="px-2">{title}</span>
    </div>
  );
};

export default ActionLoader;
