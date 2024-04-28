import React from "react";

function BallotLoader() {
  return (
    <div className="fixed top-0 left-0 w-full mx-auto h-full flex justify-center items-center bg-white z-50">
      <div className="loadingspinner">
        <div id="square1"></div>
        <div id="square2"></div>
        <div id="square3"></div>
        <div id="square4"></div>
        <div id="square5"></div>
      </div>
    </div>
  );
}

export default BallotLoader;
