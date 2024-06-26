import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import NotifySuccess from "../utils/notifications/NotifySuccess";
import NotifyError from "../utils/notifications/NotifyError";
import axios from "axios";
import getCookie from "../utils/getCookie";
import ActionLoader from "./ActionLoader";

const CreateGroupCard = () => {
  const [groupName, setGroupName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [addMemberloading, setAddMemberLoading] = useState(false);
  const groupNameRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: groupName,
      admin: JSON.parse(getCookie("authUser")).email,
      token: getCookie("token"),
    };
    try {
      setLoading(true);
      const token = getCookie("token");
      const res = await axios.post(
        "https://ballot-app-backend.onrender.com/api/v1/groups",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      NotifySuccess(`${res.data.message}`);
      setIsSubmitted(true);
      groupNameRef.current = groupName;
    } catch (error) {
      const errors = error.response.data.errors;
      errors.map((error) => NotifyError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      email: userEmail,
      group: groupNameRef.current,
    };
    const addMemberToGroup = async () => {
      try {
        setAddMemberLoading(true);
        const token = getCookie("token");
        const res = await axios.post(
          "https://ballot-app-backend.onrender.com/api/v1/members",
          userInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        NotifySuccess(`${res.data.message}`);
        //After adding a member, clear the form and add other members
        setUserEmail("");
      } catch (error) {
        NotifyError(error.response.data.message);
      } finally {
        setAddMemberLoading(false);
      }
    };
    addMemberToGroup();
  };

  return (
    <div>
      <section className="bg-white mb-16  ('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="flex justify-center items-center px-4 mx-auto max-w-screen-xl text-center relative">
          <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8  ">
            {isSubmitted ? (
              <div>
                <h5 className="text-xl pb-8 font-medium text-gray-900 ">
                  Add member to{" "}
                  <span className="text-blue-700">{groupName}</span>
                </h5>
                <form
                  className="space-y-6"
                  method="POST"
                  onSubmit={handleAddMemberSubmit}>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                      placeholder="Enter email of member to add"
                      required="required"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  :bg-blue-700 :ring-blue-800">
                    {addMemberloading ? (
                      <ActionLoader title={`Adding member...`} />
                    ) : (
                      "Add Member"
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                <h5 className="text-xl font-medium text-gray-900 ">
                  What is the name of your group?
                </h5>
                <div>
                  <input
                    type="text"
                    name="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    id="groupName"
                    className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                    placeholder="Enter Group Name"
                    required="required"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  :bg-blue-700 :ring-blue-800">
                  {loading ? (
                    <ActionLoader title={"Creating group..."} />
                  ) : (
                    "Create Group"
                  )}
                </button>
              </form>
            )}
            <div className="pt-8">
              <Link
                to="/groups/add-member"
                className="text-blue-600  hover:underline font-medium text-sm inline-flex items-center">
                Add member to an existing group
                <svg
                  className="w-3 h-3 ms-2 rtl:rotate-180"
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateGroupCard;
