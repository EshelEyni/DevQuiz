import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/types";
import { resetQuiz, startNewQuiz } from "../../store/actions/quiz.actions";
import { RootState } from "../../store/store";
import { useKey } from "react-use";
import { useState, useRef, useEffect } from "react";

type FinishScreenProps = {
  points: number;
  maxPossiblePoints: number;
  highScore: number;
};

type typeOfButton = "newQuiz" | "restart" | "none";

function FinishScreen({ points, maxPossiblePoints, highScore }: FinishScreenProps) {
  const dispatch: AppDispatch = useDispatch();
  const { language, level, page } = useSelector((state: RootState) => state.systemModule);
  const percentage = (points / maxPossiblePoints) * 100;

  const [focusedBtn, setFocusedBtn] = useState<typeOfButton>("none");
  const focusebBtnRef = useRef<typeOfButton>("none");

  let emoji;
  if (percentage === 100) emoji = "🥳";
  else if (percentage >= 80) emoji = "😎";
  else if (percentage >= 60) emoji = "🙂";
  else emoji = "😞";

  function handleNewQuizClick() {
    dispatch(startNewQuiz({ language, level, page }));
  }

  function handleRestartClick() {
    dispatch(resetQuiz());
  }

  useKey("ArrowRight", () => {
    setFocusedBtn(_ => "restart");
  });

  useKey("ArrowLeft", () => {
    setFocusedBtn(_ => "newQuiz");
  });

  useKey("Enter", () => {
    console.log(focusebBtnRef.current);
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
        You scored <strong>{points}</strong> out of <strong>{maxPossiblePoints}</strong> points. (
        {Math.ceil(percentage)})
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <div className="finish-screen-btn-container">
        <button
          className={"btn btn-ui" + (focusedBtn === "newQuiz" ? " btn-focus" : "")}
          onClick={handleNewQuizClick}
        >
          Start New Quiz
        </button>
        <button
          className={"btn btn-ui" + (focusedBtn === "restart" ? " btn-focus" : "")}
          onClick={handleRestartClick}
        >
          Restart
        </button>
      </div>
    </section>
  );
}

export default FinishScreen;
