import React from "react";

function PrivacyPolicy({ togglePrivacyPolicyModal }) {
  const handleCloseModal = () => {
    togglePrivacyPolicyModal();
  };
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden bg-white overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-2/5 mx-auto">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-3xl font-semibold text-gray-900 dark:text-white">
              Privacy Policy
            </h3>
            <button
              type="button"
              onClick={handleCloseModal}
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="static-modal">
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div class="p-4 md:p-5 space-y-4">
            <h3 className="font-bold">Last updated: April 27, 2024 </h3>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You. We use Your Personal data to provide and improve
              the Service. By using the Service, You agree to the collection and
              use of information in accordance with this Privacy Policy.
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              We will retain Your Personal Data only for as long as is necessary
              for the purposes set out in this Privacy Policy. We will retain
              and use Your Personal Data to the extent necessary to comply with
              our legal obligations (for example, if we are required to retain
              your data to comply with applicable laws), resolve disputes, and
              enforce our legal agreements and policies. The Company will also
              retain Usage Data for internal analysis purposes. Usage Data is
              generally retained for a shorter period of time, except when this
              data is used to strengthen the security or to improve the
              functionality of Our Service, or We are legally obligated to
              retain this data for longer time periods.
            </p>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default PrivacyPolicy;
