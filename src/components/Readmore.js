import React from "react";
import { Link } from "react-router-dom";

const Readmore = ({ message, link }) => {
  return (
    <Link
      to={link}
      className="text-blue-600  hover:underline font-medium text-lg inline-flex items-center">
      {message}{" "}
      <svg
        className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </Link>
  );
};

export default Readmore;
