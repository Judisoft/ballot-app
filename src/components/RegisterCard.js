import React from "react";
import { useState, useRef } from "react";
import NotifySuccess from "./../utils/notifications/NotifySuccess";
import NotifyWarning from "./../utils/notifications/NotifyWarning";
import NotifyError from "./../utils/notifications/NotifyError";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ValidateEmail from "../utils/ValidateEmail";
import ActionLoader from "./ActionLoader";
import { Link } from "react-router-dom";

const RegisterCard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    telephone: "",
    password: "",
  });

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    setOtpValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });

    // Move focus to the next input field if there is a value
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ValidateEmail(email)) {
      setIsSubmitted(false);
      NotifyWarning("Email not valid");
    } else {
      setData({
        name: name,
        email: email,
        telephone: telephone,
        password: password,
      });

      // POST request to server to send OTP to user
      const postOTP = async () => {
        try {
          const res = await axios.post(
            "https://ballot-app-backend.onrender.com/api/v1/send-otp",
            { email }
          );
          NotifySuccess(`${res.data.message}`);
        } catch (error) {
          setIsSubmitted(false);
          NotifyError(`${error.response.data.message}`);
        }
      };
      postOTP();

      setIsSubmitted(true);
    }
  };

  // Resend OTP

  const resendOTP = async () => {
    try {
      setLoadingOTP(true);
      const res = await axios.post(
        "https://ballot-app-backend.onrender.com/api/v1/send-otp",
        {
          email,
        }
      );
      NotifySuccess(`${res.data.message}`);
    } catch (error) {
      setIsSubmitted(false);
      NotifyError(`${error.response.data.message}`);
    } finally {
      setLoadingOTP(false);
    }
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const otpString = otpValues.join("");
    data.otp = otpString;
    // POST request to create user
    const createUser = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          "https://ballot-app-backend.onrender.com/api/v1/signup",
          data
        );
        NotifySuccess(`${res.data.message}`);
        setIsSubmitted(false);
        navigate("/login", data);
      } catch (error) {
        NotifyError(`${error.response.data.message}`);
      } finally {
        setLoading(false);
      }
    };
    createUser();
  };

  return (
    <div>
      <section className="bg-white mb-16  ('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="flex justify-center items-center px-4 mx-auto max-w-screen-xl text-center relative">
          <div className="w-full max-w-md mb-16 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8  ">
            {isSubmitted ? (
              <form
                className="space-y-6"
                method="POST"
                onSubmit={handleRegistrationSubmit}>
                <h5 className="text-xl font-medium text-gray-900 ">
                  Enter OTP
                </h5>
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-left text-sm font-medium text-gray-900 ">
                    Enter code sent to {email}
                  </label>
                </div>
                <div className="flex flex-row">
                  {otpValues.map((value, index) => (
                    <div className="px-2">
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={value}
                        pattern="[0-9]"
                        onChange={(e) => handleInputChange(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  :bg-blue-700 :ring-blue-800">
                  {loading ? <ActionLoader title="Registering..." /> : "Submit"}
                </button>
                <div className="text-sm font-medium text-gray-500 ">
                  Did not receive the code?{" "}
                  <Link
                    to="/login"
                    className="text-blue-700 hover:underline "
                    onClick={(e) => {
                      e.preventDefault();
                      resendOTP();
                    }}>
                    {loadingOTP ? (
                      <ActionLoader title="Resending OTP..." />
                    ) : (
                      "Resend OTP"
                    )}
                  </Link>
                </div>
              </form>
            ) : (
              <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                <h5 className="text-xl font-medium text-gray-900 ">
                  Fill the form to create an account
                </h5>
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-left text-sm font-medium text-gray-900 ">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                    placeholder="John Doe"
                    required="required"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-left text-sm font-medium text-gray-900 ">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                    placeholder="johndoe@domain.com"
                    required="required"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="tel"
                    className="block mb-2 text-left text-sm font-medium text-gray-900 ">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    id="telephone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                    placeholder="237123456789"
                    required="required"
                    value={telephone}
                    onChange={(e) => {
                      setTelephone(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-left text-sm font-medium text-gray-900 ">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
                    required="required"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="policy"
                        type="checkbox"
                        defaultValue=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300   :ring-blue-600  :ring-offset-gray-800"
                        required="required"
                      />
                    </div>
                    <label
                      htmlFor="policy"
                      className="ms-2 text-sm font-medium text-gray-900 "
                      required="required">
                      I accept the Terms of Use & Privacy Policy
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  :bg-blue-700 :ring-blue-800">
                  Register
                </button>
                <div className="text-sm font-medium text-gray-500 ">
                  Already registered?{" "}
                  <Link to="/login" className="text-blue-700 hover:underline ">
                    Login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterCard;
