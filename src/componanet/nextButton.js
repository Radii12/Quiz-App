import React from "react";

export default function NextButton({ answer, dispatch }) {
  if (answer === null) return null;
  return (
    <div className="nextButton">
      <button
        onClick={() => dispatch({ type: "nextButton" })}
        className="btn btn-ui"
      >
        Next
      </button>
    </div>
  );
}
