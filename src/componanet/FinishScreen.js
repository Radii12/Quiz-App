import React from "react";

export default function FinishScreen({
  highscore,
  points,
  numMaxPoint,
  dispatch,
}) {
  const percentage = (points / numMaxPoint) * 100;
  let emoji;
  if (percentage === 100) emoji = "🎖️";
  if (80 >= percentage && percentage > 100) emoji = "🎉";
  if (50 >= percentage && percentage > 80) emoji = "😊";
  if (0 > percentage && percentage > 50) emoji = "🙂";
  if (percentage === 0) emoji = "🙅‍♂️";

  return (
    <>
      <p className="result">
        {emoji}
        <span>You scored</span>
        <strong>{points}</strong> out of {numMaxPoint} ({Math.ceil(percentage)}
        %)
      </p>
      <p className="highscore">High Score: {highscore} points</p>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        Restart Quiz
      </button>
    </>
  );
}
