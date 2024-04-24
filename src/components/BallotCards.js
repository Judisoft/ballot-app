import React from "react";
import BallotCard from "./BallotCard";

const BallotCards = ({ members, selectedGroup }) => {
  return (
    <div>
      <div className="py-2 px-4 mx-auto max-w-screen-sm text-center lg:py-2 z-10 relative">
        <h1 className="mb-4 pt-8 text-xl tracking-tight leading-none text-gray-500 md:text-2xl lg:text-2xl dark:text-white">
          {selectedGroup}
        </h1>
        <h1 className="mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
          {members.length > 1 ? members.length + " members" : ""}
        </h1>
        {members.length > 1 && (
          <div>
            <small className="text-red-700 font-bold">
              Note: You can only choose once
            </small>
            <div className="flex flex-wrap justify-center mb-4">
              {members.map((member, key) => (
                <div key={key}>
                  <BallotCard members={members} selectedGroup={selectedGroup} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BallotCards;
