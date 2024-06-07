import React, { useState } from "react";
import axios from "axios";
import getCookie from "../utils/getCookie";
import NotifySuccess from "../utils/notifications/NotifySuccess";
import ActionLoader from "./ActionLoader";
import NotifyError from "../utils/notifications/NotifyError";

const ToggleSwitch = ({ group, ballotStatus, toggleBallotStatus }) => {
  const [ballotLoading, setBallotLoading] = useState(false); // Changed initial state to false

  const updateGroupBallotStatus = async () => {
    try {
      const token = getCookie("token");

      // Set loading state to true
      setBallotLoading(true);

      // Make API request to update group's ballot status
      const res = await axios.put(
        `https://ballot-app-backend.onrender.com/api/v1/groups/${group}`,
        { isBallotOpen: !ballotStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state only after a successful response
      toggleBallotStatus(!ballotStatus);

      // Notify success upon successful response
      NotifySuccess(res.data.message);
    } catch (error) {
      NotifyError(error.response.data.message);
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
      {/* {ballotLoading && <ActionLoader />} */}
    </div>
  );
};

export default ToggleSwitch;
