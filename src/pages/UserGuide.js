import React from "react";
import Jumbotron from "../components/Jumbotron";

const UserGuide = () => {
  return (
    <div>
      <Jumbotron title={"How to Use the Ballot App: A Step-by-Step Guide"} />
      <section className="bg-white  p-3">
        <div className="pb-16 lg:px-16 mx-auto max-w-screen-xl">
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div className="border border-blue-100 bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 font-bold">
                1
              </div>
              <span className="mb-2 text-xl font-bold ">Registering</span>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  <strong>Go to Registration:</strong> Tap on the "Get Started"
                  button on the home screen.
                </li>
                <li>
                  <strong>Fill in Details:</strong> Enter your name, email,
                  phone number, and create a password.
                </li>
                <li>
                  <strong>Submit:</strong> Tap on the "Register" button to
                  create your account.
                </li>
              </ol>
            </div>
            <div className="border border-blue-100 bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 font-bold">
                2
              </div>
              <h3 className="mb-2 text-xl font-bold ">
                Verifying your account via OTP{" "}
              </h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  <strong>Receive OTP:</strong> Check your email for the
                  One-Time Password (OTP) sent by the app.
                </li>
                <li>
                  <strong>Enter OTP:</strong> Return to the app and enter the
                  OTP in the verification field.
                </li>
                <li>
                  <strong>Verify:</strong> Tap the "Verify" button to complete
                  the verification process.
                </li>
              </ol>
            </div>
            <div className="border border-blue-100 bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 font-bold">
                3
              </div>
              <h3 className="mb-2 text-xl font-bold ">Logging In </h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  <strong>Go to Login:</strong> Tap on the "Login" button on the
                  Home screen.
                </li>
                <li>
                  <strong>Enter Credentials:</strong> Input your registered
                  email address and password.
                </li>
                <li>
                  <strong>Submit:</strong> Tap on the "Login" button to access
                  your account.
                </li>
              </ol>
            </div>
            <div className="border border-blue-100 bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 font-bold">
                4
              </div>
              <h3 className="mb-2 text-xl font-bold ">
                Creating a Ballot Group
              </h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  <strong>Navigate to Groups:</strong> From the dashboard, tap
                  on the "New Group" option.
                </li>
                <li>
                  <strong>Enter Group Details:</strong> Provide a name your
                  ballot group.
                </li>
                <li>
                  <strong>Submit:</strong> Tap on the "Create Group" button. You
                  are now the admin of this group.
                </li>
              </ol>
            </div>
            <div className="border border-blue-100 bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 font-bold">
                5
              </div>
              <h3 className="mb-2 text-xl font-bold ">Managing your Group</h3>
              <p className="mb-2">
                <strong>Admin Role:</strong> As the group creator, you are
                designated the admin.
              </p>
              <p>
                <strong>Locked Ballot:</strong> The ballot remains locked until
                all members are added and validated.
              </p>
            </div>
            <div className="border border-blue-100 bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 font-bold">
                6
              </div>
              <h3 className="mb-2 text-xl font-bold ">
                Adding Members and Unlocking the Ballot
              </h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  <strong>Add Members:</strong> In the group management section,
                  tap on "Add member to an existing Group."
                </li>
                <li>
                  <strong>Enter Emails:</strong> Input the email address of the
                  members you want to invite and the group you want to add them
                  to (in case you are admin of several groups).
                </li>
                <li>
                  <strong>Unlock Ballot:</strong> Once all members are added and
                  their email addresses validated, tap on "Unlock Ballot" to
                  enable ballot.
                </li>
              </ol>
            </div>
            <div className="border border-blue-100 bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 font-bold">
                7
              </div>
              <h3 className="mb-2 text-xl font-bold ">
                Invited Members Balloting
              </h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  <strong>Receive Invite:</strong> Members will receive an email
                  invitation to join the ballot.
                </li>
                <li>
                  <strong>Join Group:</strong> Follow the link in the email to
                  join the ballot group.
                </li>
                <li>
                  <strong>Vote:</strong> Once in the group, members can ballot
                </li>
                <li>
                  <strong>Real-time Notifications:</strong> Each time a member
                  ballots, all group members receive an email with the outcome
                  in real-time.
                </li>
              </ol>
            </div>
            <div className="border border-blue-100 bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 font-bold">
                8
              </div>
              <h3 className="mb-2 text-xl font-bold ">
                Downloading the Ballot Result
              </h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  <strong>Completion Notification:</strong> Once all ballots are
                  in, the admin will receive a notification.
                </li>
                <li>
                  <strong>Download Result:</strong> Navigate to the group
                  results section and tap on "Download Result."
                </li>
                <li>
                  <strong>Save PDF:</strong> The ballot result will be
                  downloaded as a PDF file containing a verifiable barcode.
                </li>
              </ol>
            </div>
            <div className="border border-blue-100 bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 font-bold">
                9
              </div>
              <h3 className="mb-2 text-xl font-bold ">
                Sharing the Ballot Result
              </h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  <strong>Locate PDF:</strong> Find the downloaded PDF file on
                  your device.
                </li>
                <li>
                  <strong>Share Result wtith Members:</strong> Use the sharing
                  options to send the fileto members.
                </li>
                <li>
                  <strong>Verify Authenticity:</strong> The barcode on the PDF
                  file can be scanned to verify its authenticity.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserGuide;
