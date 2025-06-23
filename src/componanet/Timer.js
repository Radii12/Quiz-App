import React, { useEffect } from "react";

export default function Timer({ dispatch, secondsRemainder }) {
  const min = Math.floor(secondsRemainder / 60);
  const second = secondsRemainder % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
      //   return clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{second < 10 && "0"}
      {second}
    </div>
  );
}
