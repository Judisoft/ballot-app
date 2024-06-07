import React, { useState } from "react";
import axios from "axios";
import getCookie from "../utils/getCookie";
import NotifySuccess from "../utils/notifications/NotifySuccess";
import ActionLoader from "./ActionLoader";

const ToggleSwitch = ({ group, ballotStatus, toggleBallotStatus }) => {
  const [ballotLoading, setBallotLoading] = useState(false); // Changed initial state to false

  const updateGroupBallotStatus = async () => {
    try {
      const token = getCookie("token");

      // Toggle the ballot status
      const newBallotStatus = !ballotStatus;

      // Update local state immediately
      toggleBallotStatus(newBallotStatus);

      // Set loading state to true
      setBallotLoading(true);

      // Make API request to update group's ballot status
      const res = await axios.put(
        `http://localhost:5000/api/v1/groups/${group}`,
        { isBallotOpen: newBallotStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      // Notify success upon successful response
      NotifySuccess(res.data.message);
    } catch (error) {
      console.error("Error updating group ballot status:", error);
    } finally {
      // Reset loading state after API call completes
      setBallotLoading(false);
    }
  };

  return (
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      {/* Disable the toggle switch while ballot status is loading */}
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        checked={ballotStatus}
        onChange={updateGroupBallotStatus}
        className="checkbox"
        disabled={ballotLoading} // Disable when loading
      />
      <label htmlFor="toggle" className="toggle"></label>
      {/* Show loading indicator if ballot status is loading */}
      {ballotLoading && <ActionLoader />}
    </div>
  );
};

export default ToggleSwitch;
