import React from "react";
import { useState } from "react";
import NotifySuccess from "./../utils/notifications/NotifySuccess";
import NotifyError from "./../utils/notifications/NotifyError";
import NotifyWarning from "./../utils/notifications/NotifyWarning";
import axios from "axios";
import ValidateEmail from "../utils/ValidateEmail";

const ResetPasswordCard = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ValidateEmail(email)) {
      NotifyWarning("Email not valid");
    } else {
      const data = { email};

      const resetUserPassword = async () => {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/v1/forgot-password",
            data
          );
          localStorage.setItem("token", res.data.token);
          NotifySuccess(`${res.data.message}`);
        } catch (error) {
          NotifyError(`${error.response.data.message}`);
        }
      };
      resetUserPassword();
    }
  };

  return (
    <div>
      <section className="bg-white mb-16 dark:bg-gray-900 dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="flex justify-center items-center px-4 mx-auto max-w-screen-xl text-center relative">
          <div className="w-full max-w-sm mb-16 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Enter your email to reset password
              </h5>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="johndoe@domain.com"
                  required="required"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Send password reset link
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPasswordCard;
