import React, { useState, useRef } from "react";
import NotifySuccess from "../utils/notifications/NotifySuccess";
import NotifyError from "../utils/notifications/NotifyError";
import axios from "axios";
import getCookie from "../utils/getCookie";

const CreateGroupCard = () => {
  const [groupName, setGroupName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const groupNameRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: groupName,
      admin: JSON.parse(getCookie("authUser")).email,
      token: getCookie("token"),
    };
    try {
      const token = getCookie("token");
      const res = await axios.post(
        "http://localhost:5000/api/v1/groups",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      NotifySuccess(`${res.data.message}`);
      setIsSubmitted(true);
      groupNameRef.current = groupName;
    } catch (error) {
      NotifyError(`${error.response.data.message}`);
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
        const token = getCookie("token");
        const res = await axios.post(
          "http://localhost:5000/api/v1/members",
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
      }
    };
    addMemberToGroup();
  };

  return (
    <div>
      <section className="bg-white mb-16 dark:bg-gray-900 dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="flex justify-center items-center px-4 mx-auto max-w-screen-xl text-center relative">
          <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            {isSubmitted ? (
              <div>
                <h5 className="text-xl pb-8 font-medium text-gray-900 dark:text-white">
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
                      className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter email of member to add"
                      required="required"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add Member
                  </button>
                </form>
              </div>
            ) : (
              <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Give a name to your Group
                </h5>
                <div>
                  <input
                    type="text"
                    name="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    id="groupName"
                    className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter Group Name"
                    required="required"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Create Group
                </button>
              </form>
            )}
            <div className="pt-8">
              <a
                href="/groups/add-member"
                className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-sm inline-flex items-center">
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
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateGroupCard;
