import React, { useState, useEffect } from "react";
import axios from "axios";
import getCookie from "../utils/getCookie";
import slugify from "../utils/slugify";
import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";

const BallotResult = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Get groups that user belongs to
    const getAllMembers = async () => {
      try {
        const response = await axios.get(
          "https://ballot-app-backend.onrender.com/api/v1/members"
        );
        const res = response.data.members;
        setMembers(res);
      } catch (error) {
        console.log(error);
      }
    };
    getAllMembers();
  }, []);

  const filteredData = members.filter(
    (obj) => obj.telephone === getCookie("authUserTelephone")
  );
  const sortedGroups = Array.from(
    new Set(filteredData.flatMap((item) => item.group))
  ).sort();

  return (
    <div>
      <Jumbotron title="Select group to view results" />
      <section className="bg-white mb-16 dark:bg-gray-900 dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="flex justify-center items-center px-4 mx-auto max-w-screen-xl text-center relative">
          <div className="w-full max-w-md p-4 bg-transparent sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            {sortedGroups.map((group) => (
              <div className="py-2">
                <Link to={`/ballots/${slugify(group)}/result?group=${group}`}>
                  <button className="block w-full p-5 text-base font-bold text-gray-900 rounded-lg bg-blue-50 hover:text-blue-500 hover:border-blue-500 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="w-full">{group}</span>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BallotResult;
