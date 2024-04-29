import React from "react";
import SelectForm from "../components/SelectGroup";
import Jumbotron from "../components/Jumbotron";
import Readmore from "../components/Readmore";
import { useSelector } from "react-redux";

const Ballot = () => {
  const user = useSelector((state) => state.authentication.authUser);

  return (
    <div>
      <Jumbotron
        title={"Njangi Groups"}
        desc={`(Logged in as: ${user.name})`}
      />
      <SelectForm />
      <div className="mx-auto max-w-screen-sm text-center relative">
        <Readmore message="Go to my groups" link={"/ballots/groups"} />
      </div>
    </div>
  );
};

export default Ballot;
