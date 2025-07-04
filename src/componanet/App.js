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
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemainder: null,
};
const NUM_SEC_MIN = 30;
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
        secondsRemainder: state.questions.length * NUM_SEC_MIN,
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
    case "Finish":
      return {
        ...state,
        status: "Finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemainder: state.secondsRemainder - 1,
        status: state.secondsRemainder === 0 ? "Finish" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}
function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemainder },
    dispatch,
  ] = useReducer(reducer, initialState);
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
            <Footer>
              <Timer secondsRemainder={secondsRemainder} dispatch={dispatch} />
              <NextButton
                numQuestions={numQuestions}
                index={index}
                answer={answer}
                dispatch={dispatch}
              />
            </Footer>
          </>
        )}
        {status === "Finish" && (
          <FinishScreen
            dispatch={dispatch}
            highscore={highscore}
            numMaxPoint={numMaxPoint}
            points={points}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
