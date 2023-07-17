import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/types";
import { RootState } from "../store/store";

export const Timer = () => {
  const { questions } = useSelector((state: RootState) => state.quizModule);
  const { secondsPerQuestion } = useSelector((state: RootState) => state.systemModule);
  const [secondsRemaining, setSecondsRemaining] = useState(questions.length * secondsPerQuestion);
  const dispatch: AppDispatch = useDispatch();
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev === 0) {
          dispatch({ type: "SET_STATUS", status: "finished" });
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);
  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};
