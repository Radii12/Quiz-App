import React from "react";

export default function Progress({
  index,
  numMaxPoint,
  answer,
  dispatch,
  numQuestions,
  points,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question
        <strong>
          {index + 1}/{numQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {" "}
          {points}/{numMaxPoint}
        </strong>{" "}
        points
      </p>
    </header>
  );
}
