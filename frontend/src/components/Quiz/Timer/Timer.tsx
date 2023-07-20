import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/types";
import { RootState } from "../../../store/store";
import { setIsTimerOn } from "../../../store/actions/quiz.actions";
import "./Timer.scss";

export const Timer = () => {
  const dispatch: AppDispatch = useDispatch();
  const { questions, isTimerOn } = useSelector((state: RootState) => state.quizModule);
  const { secondsPerQuestion } = useSelector((state: RootState) => state.systemModule);
  const [secondsRemaining, setSecondsRemaining] = useState(questions.length * secondsPerQuestion);

  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  function startTimer() {
    intervalId.current = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev === 0) {
          dispatch({ type: "SET_STATUS", status: "finished" });
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function stopTimer() {
    if (intervalId.current) clearInterval(intervalId.current);
  }

  useEffect(() => {
    dispatch(setIsTimerOn(true));
  }, []);

  useEffect(() => {
    if (isTimerOn) startTimer();
    else stopTimer();

    return () => {
      stopTimer();
    };
  }, [isTimerOn]);

  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};
