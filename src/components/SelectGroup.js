import React, { useState, useEffect } from "react";
import axios from "axios";
import NotifyError from "../utils/notifications/NotifyError";
import getCookie from "../utils/getCookie";
import BallotCards from "./BallotCards";
import ActionLoader from "./ActionLoader";
import { Link } from "react-router-dom";

const SelectGroup = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [loading, setLoading] = useState(true);

  const getAllMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/members");
      setMembers(res.data.members);
    } catch (error) {
      if (error.response.status === 401) {
        NotifyError("Unauthorized Access!");
      } else {
        NotifyError(error.response.data.message);
      }
    }
  };

  const getUserGroups = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/members");
      setUserGroups(res.data.members);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      getAllMembers();
    }
  }, [selectedGroup]);

  const handleOnChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const filteredGroups = userGroups.filter(
    (group) => group.email === JSON.parse(getCookie("authUser")).email
  );

  const sortedGroups = Array.from(
    new Set(filteredGroups.flatMap((group) => group.group))
  ).sort();

  const options = sortedGroups.map((group) => (
    <option key={group}>{group}</option>
  ));

  const memberData = members
    .filter((member) => member.group.includes(selectedGroup))
    .map((member) => member.name);

  return (
    <div>
      <div className="py-2 px-4 mb-8 mx-auto max-w-screen-sm text-center lg:py-2  relative">
        {loading ? (
          <ActionLoader title="Loading..." />
        ) : sortedGroups.length > 0 ? (
          <select
            value={selectedGroup}
            onChange={handleOnChange}
            className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     :ring-blue-500 :border-blue-500">
            <option value="">Select a group to ballot</option>
            {options}
          </select>
        ) : (
          // Render the "You do not belong to any group" message when there are no groups
          <div className="pb-8 border bg-blue-100 rounded-md">
            <p className="p-8 text-2xl font-normal tracking-tight leading-none text-gray-700 md:text-2xl lg:text-2xl ">
              You do not belong to any group <br />
            </p>
            <Link
              to="/groups"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold  rounded-lg text-md px-5 py-2.5 mr-2 mb-2  :bg-blue-700 focus:outline-none :ring-blue-800">
              Create Group
            </Link>
          </div>
        )}
        {members.length > 1 && (
          <div>
            <p className="text-center py-2">
              Select a box from the boxes above to ballot
            </p>
            <BallotCards members={memberData} selectedGroup={selectedGroup} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectGroup;
