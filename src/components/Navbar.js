import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthentication } from '../slices/authenticationSlice';
import deleteCookie from '../utils/deleteCookie';


const Navbar = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.authentication.isAuthenticated);

    const handleLogout = () => {
        deleteCookie("token");
        dispatch(checkAuthentication());
    }

  return (
    <div>
        <nav className="bg-white border-b border-gray-100 dark:bg-gray-900 fixed w-full top-0 start-0 z-20  dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                href="#homePageLink"
                className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                <span className="self-center text-2xl font-bold text-gray-700 whitespace-nowrap dark:text-white">
                    NjangiBallot.com
                </span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                {isLoggedIn ? (
                    <button 
                        onClick={handleLogout}
                        className="text-gray-700 border border-gray-700 hover:text-white hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Log Out
                    </button>
                    ): (
                        <>
                            <a  href="/register"
                        className="text-white bg-gray-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                                Register
                            </a>
                            <a href="/login"
                                className="text-gray-700 bg-transparent  focus:outline-none font-bold rounded-lg text-sm px-4 py-2 text-center dark:transparent"
                            >
                                Login
                            </a>
                        </>
                    )}
                <button
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-md text-gray-500 rounded-lg bg-gray-100 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky"
                    aria-expanded="false"
                >
                    {/* <span className="sr-only">Open main menu</span> */}
                    <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M1 1h15M1 7h15M1 13h15"
                    />
                    </svg>
                </button>
                </div>
                <div
                className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar-sticky"
                >
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-bold border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                    <a
                        href="/"
                        className="block py-2 px-3 text-gray-700 bg-blue-700 rounded md:bg-transparent md:p-0 md:hover:text-blue-700 md:dark:text-blue-500"
                    >
                        Home
                    </a>
                    </li>
                    <li>
                    <a
                        href="/about"
                        className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                        About
                    </a>
                    </li>
                    <li>
                    <a
                        href="/ballot"
                        className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                        Ballot
                    </a>
                    </li>
                    <li>
                    <a
                        href="/groups"
                        className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                        Group Manager
                    </a>
                    </li>
                    <li>
                    <a
                        href="/contact"
                        className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                        Contact Us
                    </a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>

    </div>
  )
}

export default Navbar