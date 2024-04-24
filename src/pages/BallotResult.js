import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import getCookie from "../utils/getCookie";
import Jumbotron from "../components/Jumbotron";

const BallotResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const group = searchParams.get("group");
  const [ballotResult, setBallotResult] = useState([]);

  useEffect(() => {
    const getBallotResult = async () => {
      try {
        const token = getCookie("token");
        const res = await axios.post(
          "http://localhost:5000/api/v1/ballots/ranks",
          { group },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBallotResult(res.data.ballotList);
      } catch (error) {
        console.log(error);
      }
    };
    getBallotResult();
  }, [group]);
  return (
    <div>
      <Jumbotron title={`Ballot result for ${group}`} />
      <section className="bg-white mb-16 dark:bg-gray-900 dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="flex justify-center items-center px-4 mx-auto max-w-screen-xl text-center relative">
          <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="relative overflow-x-auto">
              {ballotResult.length > 0 ? (
                ballotResult.map((result) => (
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 font-semibold text-lg text-gray-500">
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 font-semibold text-lg text-gray-500">
                          Rank
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold text-md text-gray-500">
                          {result.userName}
                        </td>
                        <td className="px-6 py-4 font-semibold text-md text-gray-500">
                          {result.rank}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))
              ) : (
                <p>No one has balloted yet</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BallotResult;
