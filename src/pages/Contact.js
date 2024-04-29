import axios from "axios";
import React, { useState } from "react";
import NotifySuccess from "../utils/notifications/NotifySuccess";
import NotifyError from "../utils/notifications/NotifyError";
import Jumbotron from "../components/Jumbotron";

const Contact = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendLoading, setSendLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a data object with the form field values
    const data = {
      userName: userName,
      email: email,
      message: message,
    };

    const postContactInfo = async () => {
      try {
        setSendLoading(true);
        const res = await axios.post(
          "http://localhost:5000/api/v1/contact",
          data
        );
        if (res.data) {
          NotifySuccess(`${res.data.message}`);
        }
        setSendLoading(false);
      } catch (error) {
        if (error.response.data) {
          NotifyError(`${error.response.data.message}`);
        } else {
          NotifyError("Sorry something went wrong");
        }
      } finally {
        setSendLoading(false);
      }
    };
    postContactInfo();
  };

  return (
    <div>
      <Jumbotron title={"Get in Touch with Us"} />
      <section className="bg-white dark:bg-gray-900 mb-32">
        <div className="pb-24 lg:pb-16 px-4 mx-auto max-w-screen-md">
          <p className="mb-8 lg:mb-16 text-center text-gray-900 dark:text-gray-400 sm:text-xl">
            Got a technical issue? Want to send feedback? We're here to answer
            your questions and provide support. Reach out to us and let us
            assist you in making your ballot experience exceptional.
          </p>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label
                for="Username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Name
              </label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                className="hover:shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="hover:shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="johndoe@domain.com"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg hover:shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a Message..."></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {sendLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
