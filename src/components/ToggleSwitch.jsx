import React, { useState, useEffect } from "react";
import axios from "axios";
import getCookie from "../utils/getCookie";
import NotifySuccess from "../utils/notifications/NotifySuccess";
import ActionLoader from "./ActionLoader";
import NotifyError from "../utils/notifications/NotifyError";

const ToggleSwitch = ({ group }) => {
  const [ballotStatus, setBallotStatus] = useState(null);
  const [ballotLoading, setBallotLoading] = useState(true);

  const toggleBallotStatus = () => {
    setBallotStatus(!ballotStatus);
  };

  const updateGroupBallotStatus = async () => {
    try {
      const token = getCookie("token");

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

  const getGroupBallotStatus = async () => {
    try {
      const token = getCookie("token");
      const res = await axios.get(
        `https://ballot-app-backend.onrender.com/api/v1/groups/${group}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBallotStatus(res.data.group.isBallotOpen);
    } catch (error) {
      console.log(error);
    } finally {
      setBallotLoading(false);
    }
  };

  useEffect(() => {
    getGroupBallotStatus();
  }, [group]);

  return (
    <div className="flex justify-center mb-8">
      <div className="px-4">
        <h4 className="text-xl">
          Ballot is{" "}
          {ballotStatus ? (
            <>
              <strong>Open</strong> <br />
              <span className="text-sm text-gray-500">Members can ballot</span>
            </>
          ) : (
            <>
              <strong>Closed</strong> <br />
              <span className="text-sm text-gray-500">
                Members cannot ballot
              </span>
            </>
          )}
        </h4>
      </div>
      <div className="px-4">
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
      </div>
    </div>
  );
};

export default ToggleSwitch;
