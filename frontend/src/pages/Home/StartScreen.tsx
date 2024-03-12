import { useDispatch } from "react-redux";
import { useKey } from "react-use";
import { useQuiz } from "../../hooks/useQuiz";
import { setStatus } from "../../store/slices/quizSlice";
import { AppDispatch } from "../../types/app.types";
import { Button } from "../../components/Btns/Button";
import { useState } from "react";
import classnames from "classnames";
export const StartScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const { language, numQuestions } = useQuiz();
  const [isFocused, setIsFocused] = useState(false);

  useKey("Enter", handleStartQuiz);
  useKey("ArrowDown", handleArrowDown);
  useKey("ArrowUp", handleArrowUp);

  function handleStartQuiz() {
    dispatch(setStatus("active"));
  }

  function handleArrowUp() {
    setIsFocused(false);
  }

  function handleArrowDown() {
    setIsFocused(true);
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-3 px-3">
      <h2 className="w-full text-center text-4xl font-bold text-gray-50">{`Welcome to The ${language} Quiz!`}</h2>
      <h3 className="w-full text-center text-xl font-bold text-gray-50 ">{`${numQuestions} question to test your ${language} mastery`}</h3>

      {numQuestions > 0 && (
        <Button
          onClickFn={handleStartQuiz}
          className={classnames(
            "mt-10 rounded-full bg-gray-600 px-8 py-6 text-3xl font-medium uppercase text-gray-100 transition-all duration-300",
            {
              "scale-110 bg-gray-800 text-gray-200": isFocused,
            },
          )}
        >
          {"Let's start"}
        </Button>
      )}
    </div>
  );
};
