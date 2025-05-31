import "./App.css";
import Header from "../Header";
import Main from "../Main";
import { useEffect, useReducer } from "react";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Error from "./Error";
import Question from "./Quetions";
import NextButton from "./nextButton";
import Progress from "./Progress";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextButton":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("Action unknown");
  }
}
function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const numMaxPoint = questions.reduce((prev, cur) => prev + cur.points, 0);
  useEffect(function fetchData() {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(
        (err) => dispatch({ type: "dataFailed" })
        // dispach({ type: "dataFailed" })
      );
  }, []);
  return (
    <div>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQusitons={numQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              dispatch={dispatch}
              answer={answer}
              numMaxPoint={numMaxPoint}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              questions={questions[index]}
            />
          </>
        )}
        <NextButton answer={answer} dispatch={dispatch} />
      </Main>
    </div>
  );
}

export default App;
