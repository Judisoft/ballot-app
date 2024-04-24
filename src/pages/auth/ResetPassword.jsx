import React from "react";
import ResetPasswordCard from "../../components/ResetPasswordCard";
import Jumbotron from "../../components/Jumbotron";

const ResetPassword = () => {
  return (
    <div>
      <Jumbotron title={"BallotApp - Reset Password"} />
      <ResetPasswordCard />
    </div>
  );
};

export default ResetPassword;
