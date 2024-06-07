import React from "react";
import BallotCard from "./BallotCard";
import { Link } from "react-router-dom";

const BallotCards = ({ members, selectedGroup }) => {
  return (
    <div>
      <div className="py-2 px-4 mx-auto max-w-screen-sm text-center lg:py-2 z-10 relative">
        <h1 className="mb-4 pt-8 text-xl tracking-tight leading-none font-bold text-gray-700 md:text-2xl lg:text-2xl ">
          {selectedGroup}
        </h1>
        <p className="mb-4 text-md tracking-tight leading-none text-gray-500 md:text-md lg:text-md ">
          {members.length > 1 ? members.length + " members" : ""}
        </p>
        {members.length > 1 ? (
          <div>
            <br />
            <div className="flex flex-wrap justify-center mb-4">
              {members.map((member, key) => (
                <div key={key}>
                  <BallotCard members={members} selectedGroup={selectedGroup} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="text-gray-500 pb-2 text-sm">No member added</div>
            <Link to="/groups/add-member" className="text-blue-500 underline">
              Add member
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default BallotCards;
