import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useKey } from "react-use";
import { useQuiz } from "../../hooks/useQuiz";
import { resetQuizState, startNewQuiz } from "../../store/slices/quizSlice";
import { AppDispatch } from "../../types/app.types";
import { Button } from "../../components/Btns/Button";
import classnames from "classnames";

type typeOfButton = "newQuiz" | "restart" | "none";

export const FinishScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    language,
    level,
    page,
    points,
    maxPossiblePoints,
    highScore,
    numQuestions,
  } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;

  const [focusedBtn, setFocusedBtn] = useState<typeOfButton>("none");
  const focusebBtnRef = useRef<typeOfButton>("none");

  let emoji;
  if (percentage === 100) emoji = "🥳";
  else if (percentage >= 80) emoji = "😎";
  else if (percentage >= 60) emoji = "🙂";
  else emoji = "😞";

  function handleNewQuizClick() {
    dispatch(
      startNewQuiz({
        language,
        level,
        page: page + 1,
        limit: numQuestions,
      }),
    );
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
    <section className="flex flex-col items-center gap-12 px-4">
      <p
        className="rounded-full px-6 py-8 text-center text-4xl font-medium"
        style={{
          background: "var(--color-theme)",
        }}
      >
        <span className="mr-[4px] text-4xl">{emoji}</span>
        You scored <strong>{points}</strong> out of{" "}
        <strong>{maxPossiblePoints}</strong> points. ({Math.ceil(percentage)}%)
      </p>
      <p className="text-center text-3xl">(Highscore: {highScore} points)</p>
      <div className="flex items-center justify-center gap-5">
        <Button
          className={classnames(
            "cursor-pointer rounded-full bg-gray-600 px-10 py-7 text-3xl font-medium text-gray-100 transition-all duration-300",
            {
              "scale-110 bg-gray-800 text-gray-200": focusedBtn === "newQuiz",
            },
          )}
          onClickFn={handleNewQuizClick}
        >
          Start New Quiz
        </Button>
        <Button
          className={classnames(
            "cursor-pointer rounded-full bg-gray-600 px-10 py-7 text-3xl font-medium text-gray-100 transition-all duration-300",
            {
              "scale-110 bg-gray-800 text-gray-200": focusedBtn === "restart",
            },
          )}
          onClickFn={handleRestartClick}
        >
          Restart
        </Button>
      </div>
    </section>
  );
};
