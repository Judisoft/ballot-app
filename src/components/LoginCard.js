import React, { useEffect } from "react";
import { useState } from "react";
import NotifySuccess from "./../utils/notifications/NotifySuccess";
import NotifyError from "./../utils/notifications/NotifyError";
import NotifyWarning from "./../utils/notifications/NotifyWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ValidateEmail from "../utils/ValidateEmail";
import setCookie from "./../utils/setCookie";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthentication,
  getAuthUserInfo,
} from "../slices/authenticationSlice";
import Loader from "./Loader";
import ActionLoader from "./ActionLoader";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const userIsAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async (payload) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/login",
        payload
      );
      const token = res.data.token;

      setCookie("token", token, 60);
      setCookie(
        "authUser",
        JSON.stringify({
          name: res.data.User.name,
          telephone: res.data.User.telephone,
          email: res.data.User.email,
          role: res.data.User.role,
        }),
        120
      );
      dispatch(checkAuthentication());
      dispatch(
        getAuthUserInfo({
          name: res.data.User.name,
          telephone: res.data.User.telephone,
          email: res.data.User.eamil,
          role: res.data.User.role,
        })
      );
      NotifySuccess(`${res.data.message}`);
      navigate("/ballot");
    } catch (error) {
      console.log(error);
      NotifyError(`${error.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ValidateEmail(email)) {
      NotifyWarning("Email not valid");
    } else {
      const payload = { email, password };
      loginUser(payload);
    }
  };

  useEffect(() => {
    if (userIsAuthenticated) {
      return navigate("/dashboard");
    }
  }, [userIsAuthenticated, navigate]);

  return (
    <div>
      <section className="bg-white mb-16 dark:bg-gray-900 dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="flex justify-center items-center px-4 mx-auto max-w-screen-xl text-center relative">
          <div className="w-full max-w-sm mb-16 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Provide your credentials to log in
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
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required=""
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                <a
                  href="/reset-password"
                  className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">
                {loading ? (
                  <ActionLoader title="Logging in..." />
                ) : (
                  "Grant me access"
                )}
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <a
                  href="/register"
                  className="text-blue-700 hover:underline dark:text-blue-500">
                  Create account
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginCard;
