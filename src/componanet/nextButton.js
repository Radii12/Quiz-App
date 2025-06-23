import React from "react";

export default function NextButton({ answer, dispatch, index, numQuestions }) {
  if (answer === null) return null;
  if (index < numQuestions - 1)
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
  if (index === numQuestions - 1)
    return (
      <div className="nextButton">
        <button
          onClick={() => dispatch({ type: "Finish" })}
          className="btn btn-ui"
        >
          Finish
        </button>
      </div>
    );
}
