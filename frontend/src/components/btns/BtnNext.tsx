import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/types";
import { RootState } from "../../store/store";

type NextButtonProps = {
  answerIdx: number | null;
  questionIdx: number;
  numQuestions: number;
};

function BtnNext({ answerIdx, questionIdx, numQuestions }: NextButtonProps) {
  const { points, highScore } = useSelector((state: RootState) => state.quizModule);
  const dispatch: AppDispatch = useDispatch();

  function handleNextClick() {
    dispatch({ type: "SET_NEXT_QUESTION_IDX" });
  }

  function handleFinishClick() {
    dispatch({ type: "SET_STATUS", status: "finished" });
    const isHighScore = points > highScore;
    if (isHighScore) dispatch({ type: "SET_HIGH_SCORE", highScore: points });
  }

  if (answerIdx === null) return <></>;
  if (questionIdx < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={handleNextClick}>
        Next
      </button>
    );
  if (questionIdx === numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={handleFinishClick}>
        Finish
      </button>
    );
  return <></>;
}

export default BtnNext;
