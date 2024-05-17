import React, { useState } from "react";
import { Link } from "react-router-dom";
import PrivacyPolicyModal from "../components/modals/PrivacyPolicy";
import LicenceModal from "../components/modals/Licence";

const Footer = () => {
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] =
    useState(false);
  const [isLicenceModalOpen, setIsLicenceModalOpen] = useState(false);

  const togglePrivacyPolicyModal = () => {
    setIsPrivacyPolicyModalOpen(!isPrivacyPolicyModalOpen);
  };

  const toggleLicenceModal = () => {
    setIsLicenceModalOpen(!isLicenceModalOpen);
  };

  return (
    <div>
      <footer className="fixed bottom-0 left-0 w-full p-1  bg-gray-50 border-gray-200 md:flex md:items-center md:justify-between md:p-4  ">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <div className="hidden md:block lg:block">
            {/* <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  sm:mt-0">
              <li>
                <Link to="/about" className="hover:underline me-4 md:me-6">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#PrivacyPolicy"
                  onClick={togglePrivacyPolicyModal}
                  className="hover:underline me-4 md:me-6">
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="#Licensing"
                  onClick={toggleLicenceModal}
                  className="hover:underline me-4 md:me-6">
                  Licensing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul> */}
          </div>
          <div className="mt-2 md:mt-0">
            <span className="text-sm text-gray-500 sm:text-center ">
              © {new Date().getFullYear()}
              <Link to="/" className="hover:underline me-4 md:me-6">
                {" "}
                BallotApp
              </Link>
              <Link
                to="#Licensing"
                onClick={toggleLicenceModal}
                className="hover:underline me-4 md:me-6">
                License
              </Link>
              <Link
                to="#PrivacyPolicy"
                onClick={togglePrivacyPolicyModal}
                className="hover:underline me-4 md:me-6">
                Privacy
              </Link>
            </span>
          </div>
        </div>
      </footer>
      {isPrivacyPolicyModalOpen && (
        <PrivacyPolicyModal
          togglePrivacyPolicyModal={togglePrivacyPolicyModal}
        />
      )}
      {isLicenceModalOpen && (
        <LicenceModal toggleLicenceModal={toggleLicenceModal} />
      )}
    </div>
  );
};

export default Footer;
