import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import axios from "axios";
import Graph from "../../components/Graph";
import getCookie from "../../utils/getCookie";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [ballots, setBallots] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingBallots, setLoadingBallots] = useState(true);
  // get all users
  useEffect(() => {
    // get all users
    const getAllUsers = async () => {
      try {
        const token = getCookie("token");
        const response = await axios.get("http://localhost:5000/api/v1/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingUsers(false);
      }
    };
    getAllUsers();
  }, []);

  // get all groups
  useEffect(() => {
    // get all users
    const getAllGroups = async () => {
      try {
        const token = getCookie("token");
        const response = await axios.get(
          "http://localhost:5000/api/v1/groups",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGroups(response.data.groups);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingGroups(false);
      }
    };
    getAllGroups();
  }, []);

  useEffect(() => {
    // get all ballots
    const getAllBallots = async () => {
      try {
        const token = getCookie("token");
        const response = await axios.get(
          "http://localhost:5000/api/v1/ballots/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBallots(response.data.ballots);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingBallots(false);
      }
    };
    getAllBallots();
  }, []);

  return (
    <div className="w-4/5 mx-auto p-4  mt-32">
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-32 rounded bg-gray-50 dark:bg-gray-800">
            {users && (
              <DashboardCard
                title="Users"
                count={users.length}
                loading={loadingUsers}
              />
            )}
          </div>
          <div className="flex items-center justify-center h-32 rounded bg-gray-50 dark:bg-gray-800">
            {groups && (
              <DashboardCard
                title="Groups"
                count={groups.length}
                loading={loadingGroups}
              />
            )}
          </div>
          <div className="flex items-center justify-center h-32 rounded bg-gray-50 dark:bg-gray-800">
            {ballots && (
              <DashboardCard
                title="Ballots"
                count={ballots.length}
                loading={loadingBallots}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          {/* <Graph /> */}
          Charts here
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
