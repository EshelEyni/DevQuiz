import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/types";
import { useKey } from "react-use";
import { useQuiz } from "../../../hooks/useQuiz";
import "./FinishScreen.scss";
import { resetQuizState, startNewQuiz } from "../../../store/slices/quizSlice";

type typeOfButton = "newQuiz" | "restart" | "none";

export const FinishScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const { language, level, page, points, maxPossiblePoints, highScore } =
    useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;

  const [focusedBtn, setFocusedBtn] = useState<typeOfButton>("none");
  const focusebBtnRef = useRef<typeOfButton>("none");

  let emoji;
  if (percentage === 100) emoji = "🥳";
  else if (percentage >= 80) emoji = "😎";
  else if (percentage >= 60) emoji = "🙂";
  else emoji = "😞";

  function handleNewQuizClick() {
    dispatch(startNewQuiz({ language, level, page: page + 1 }));
  }

  function handleRestartClick() {
    dispatch(resetQuizState());
  }

  useKey("ArrowRight", () => {
    setFocusedBtn(_ => "restart");
  });

  useKey("ArrowLeft", () => {
    setFocusedBtn(_ => "newQuiz");
  });

  useKey("Enter", () => {
    const focusedBtn = focusebBtnRef.current;
    if (focusedBtn === "newQuiz") handleNewQuizClick();
    else if (focusedBtn === "restart") handleRestartClick();
  });

  function clearFocusBtn() {
    setFocusedBtn(_ => "none");
  }

  useEffect(() => {
    document.addEventListener("mousemove", clearFocusBtn);
    return () => {
      document.removeEventListener("mousemove", clearFocusBtn);
    };
  }, []);

  useEffect(() => {
    focusebBtnRef.current = focusedBtn;
  }, [focusedBtn]);

  return (
    <section className="finish-screen">
      <p className="result">
        <span className="emoji">{emoji}</span>
        You scored <strong>{points}</strong> out of{" "}
        <strong>{maxPossiblePoints}</strong> points. ({Math.ceil(percentage)})
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <div className="finish-screen-btn-container">
        <button
          className={
            "btn btn-ui" + (focusedBtn === "newQuiz" ? " btn-focus" : "")
          }
          onClick={handleNewQuizClick}
        >
          Start New Quiz
        </button>
        <button
          className={
            "btn btn-ui" + (focusedBtn === "restart" ? " btn-focus" : "")
          }
          onClick={handleRestartClick}
        >
          Restart
        </button>
      </div>
    </section>
  );
};
