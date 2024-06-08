import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  checkAuthentication,
  getAuthUserInfo,
} from "../slices/authenticationSlice";
import deleteCookie from "../utils/deleteCookie";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("authUser");
    dispatch(checkAuthentication());
    dispatch(getAuthUserInfo(null));
  };

  const handleMenuBtnClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav className="bg-white border-b border-gray-100  fixed w-full top-0 start-0 z-20  ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
            onClick={handleMenuItemClick}>
            <span className="self-center text-2xl font-bold text-gray-700 whitespace-nowrap ">
              <img src={logo} alt="logo" className="h-16 w-16" />
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-red-600 border border-red-600 bg-red-200 hover:text-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  :bg-blue-700 :ring-blue-800">
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  :bg-blue-700 :ring-blue-800"
                  onClick={handleMenuItemClick}>
                  Get started
                </Link>
                <Link
                  to="/login"
                  className="text-gray-700 bg-transparent  focus:outline-none font-bold rounded-lg text-sm px-4 py-2 text-center "
                  onClick={handleMenuItemClick}>
                  Login
                </Link>
              </>
            )}
            <button
              onClick={handleMenuBtnClick}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-md text-gray-500 rounded-lg bg-gray-100 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  :bg-gray-700 :ring-gray-600">
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-menu">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
          <div className="items-center justify-between w-full md:flex md:w-auto md:order-1 hidden">
            <ul className="flex flex-col p-4 md:p-0 mt-4   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   md: ">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-700  rounded md:bg-transparent md:p-0 md:hover:text-blue-700 md:"
                  onClick={handleMenuItemClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::text-blue-500  :bg-gray-700 :text-white md::bg-transparent "
                  onClick={handleMenuItemClick}>
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/ballot"
                  className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::text-blue-500  :bg-gray-700 :text-white md::bg-transparent "
                  onClick={handleMenuItemClick}>
                  Ballot
                </Link>
              </li>
              <li>
                <Link
                  to="/groups"
                  className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::text-blue-500  :bg-gray-700 :text-white md::bg-transparent "
                  onClick={handleMenuItemClick}>
                  New Group
                </Link>
              </li>
              <li>
                <Link
                  to="/user-guide"
                  className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::text-blue-500  :bg-gray-700 :text-white md::bg-transparent "
                  onClick={handleMenuItemClick}>
                  User Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::text-blue-500  :bg-gray-700 :text-white md::bg-transparent "
                  onClick={handleMenuItemClick}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {isMenuOpen && (
            <div className="items-center justify-between w-full md:flex md:w-auto md:order-1">
              <ul className="flex flex-col p-4 md:p-0 mt-4   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   md: ">
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-gray-700  rounded md:bg-transparent md:p-0 md:hover:text-blue-700 md:"
                    onClick={handleMenuItemClick}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::text-blue-500  :bg-gray-700 :text-white md::bg-transparent "
                    onClick={handleMenuItemClick}>
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ballot"
                    className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::text-blue-500  :bg-gray-700 :text-white md::bg-transparent "
                    onClick={handleMenuItemClick}>
                    Ballot
                  </Link>
                </li>
                <li>
                  <Link
                    to="/groups"
                    className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::text-blue-500  :bg-gray-700 :text-white md::bg-transparent "
                    onClick={handleMenuItemClick}>
                    Group Manager
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user-guide"
                    className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::text-blue-500  :bg-gray-700 :text-white md::bg-transparent "
                    onClick={handleMenuItemClick}>
                    User Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md::text-blue-500  :bg-gray-700 :text-white md::bg-transparent "
                    onClick={handleMenuItemClick}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
