import React from 'react';

const Footer = () => {
  return (
    <div>
        <footer className="fixed bottom-0 left-0 w-full p-1 bg-gray-50 border-gray-200 md:flex md:items-center md:justify-between md:p-4 dark:bg-gray-800 dark:border-gray-600">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <div className="hidden md:block lg:block">
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="/about" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#Policy" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#Licensing" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="/contact" className="hover:underline">Contact</a>
                </li>
            </ul>
            </div>
            <div className="mt-8 md:mt-0">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} 
                    <a href="/" className="hover:underline">{" "}NjangiBallot.com</a>. 
                    All Rights Reserved.
                </span>
            </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer