import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotifySuccess from "./../utils/notifications/NotifySuccess";
import NotifyError from "./../utils/notifications/NotifyError";
import axios from "axios";
import ActionLoader from "./ActionLoader";

const ChangePasswordCard = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { password };

    const changeUserPassword = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `https://ballot-app-backend.onrender.com/api/v1/reset-password/${token}`,
          data
        );
        NotifySuccess(`${res.data.message}`);
        navigate("/login");
      } catch (error) {
        NotifyError(`${error.response.data.message}`);
      } finally {
        setLoading(false);
      }
    };
    changeUserPassword();
  };

  return (
    <div>
      <section className="bg-white mb-16  ('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="flex justify-center items-center px-4 mx-auto max-w-screen-xl text-center relative">
          <div className="w-full max-w-sm mb-16 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8  ">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h5 className="text-xl font-medium text-gray-900 ">
                Enter new Password
              </h5>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-left text-sm font-medium text-gray-900 ">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  :bg-blue-700 :ring-blue-800">
                {loading ? (
                  <ActionLoader title="Resetting password..." />
                ) : (
                  "Set new password"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePasswordCard;
