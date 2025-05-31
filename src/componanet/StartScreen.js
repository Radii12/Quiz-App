import React from "react";

export default function StartScreen({ dispatch, numQusitons }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQusitons} questions to test your React mastery</h3>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Lets Start
      </button>
    </div>
  );
}
