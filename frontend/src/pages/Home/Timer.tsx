import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuiz } from "../../hooks/useQuiz";
import { setIsTimerOn, setStatus } from "../../store/slices/quizSlice";
import { AppDispatch } from "../../types/app.types";

export const Timer = () => {
  const dispatch: AppDispatch = useDispatch();
  const { questions, isTimerOn, secondsPerQuestion } = useQuiz();
  const [secondsRemaining, setSecondsRemaining] = useState(
    questions.length * secondsPerQuestion,
  );

  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  function stopTimer() {
    if (intervalId.current) clearInterval(intervalId.current);
  }

  useEffect(() => {
    dispatch(setIsTimerOn(true));

    return () => {
      dispatch(setIsTimerOn(false));
    };
  }, [dispatch]);

  useEffect(() => {
    function startTimer() {
      intervalId.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev === 0) {
            dispatch(setStatus("finished"));
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (isTimerOn) startTimer();
    else stopTimer();

    return () => {
      stopTimer();
    };
  }, [isTimerOn, dispatch]);

  return (
    <div className="col-start-1 row-start-1 flex h-16 items-center justify-center justify-self-start rounded-[100px] border-2 border-gray-200 px-8 text-3xl text-gray-200">
      <span>
        {minutes < 10 && "0"}
        {minutes}:{seconds < 10 && "0"}
        {seconds}
      </span>
    </div>
  );
};
