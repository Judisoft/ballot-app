import React from "react";
import Jumbotron from "../components/Jumbotron";
import bg from "../assets/images/bg.jpg";

const Homepage = () => {
  return (
    <div>
      <Jumbotron
        desc={
          "Transparency at its finest! Introducing the revolutionary Transparent Ballot App, ensuring \
                every pick is seen, recorded, and protected. Embrace the future of secure and trustworthy Njangi Ballot!"
        }
        readmore={true}
      />
    </div>
  );
};

export default Homepage;
