import React, { useState, useEffect } from "react";
import axios from "axios";
import generateRank from "./../utils/generateRank";
import getCookie from "./../utils/getCookie";
import NotifySuccess from "./../utils/notifications/NotifySuccess";
import NotifyError from "./../utils/notifications/NotifyError";
import BallotLoader from "./BallotLoader";

const BallotCard = ({ members, selectedGroup }) => {
  const [loading, setLoading] = useState(false);
  const [unavailableRanks, setUnavailableRanks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUniqueRank = async () => {
      try {
        const group = selectedGroup;
        const token = getCookie("token");
        const res = await axios.post(
          "https://ballot-app-backend.onrender.com/api/v1/ballots/ranks",
          { group },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const ranks = res.data.ballotList.map((item) => item.rank);
        setUnavailableRanks(ranks);
      } catch (error) {
        console.log(error);
      }
    };

    getUniqueRank();
  }, [selectedGroup]);

  const handleMouseOver = (e) => {
    setMessage("Click to ballot");
  };

  const handleMouseOut = (e) => {
    setMessage("");
  };

const handleClick = async (e) => {
  const numOfMembers = members.length;
  const rank = generateRank(unavailableRanks, numOfMembers);
  const authUser = JSON.parse(getCookie("authUser"));
  const group = selectedGroup;

  try {
    setLoading(true);
    const token = getCookie("token");

    // Send rank generation request to server
    const res = await axios.post(
      "https://ballot-app-backend.onrender.com/api/v1/check-rank",
      { rank, group },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.unique) {
      // Save the ballot result if the rank is unique
      const saveRes = await axios.post(
        "https://ballot-app-backend.onrender.com/api/v1/ballots",
        {
          userName: authUser.name,
          group: group,
          hasBalloted: true,
          rank: rank,
          memberEmail: authUser.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      NotifySuccess(saveRes.data.message);
    } else {
      NotifyError("The rank is no longer available. Please try again.");
    }
  } catch (error) {
    console.log(error);
    NotifyError(error.response?.data?.message || "An error occurred");
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <div className="p-4">
        <button
          className="flex p-8 bg-blue-600 hover:bg-blue-700  text- text-center items-center justify-center h-24 w-24 rounded-lg custom-shadow  hover:border-blue-700   :bg-blue-700"
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}>
          {message}
        </button>
        {loading ? <BallotLoader /> : null}
      </div>
    </div>
  );
};

export default BallotCard;
