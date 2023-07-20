import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/types";
import { RootState } from "../../../store/store";
import { useKey } from "react-use";

export const BtnNext = () => {
  const { questionIdx, numQuestions, points, highScore } = useSelector(
    (state: RootState) => state.quizModule
  );
  const dispatch: AppDispatch = useDispatch();
  const isValidQuestionIdx = questionIdx >= 0 && questionIdx < numQuestions - 1;
  const isLastQuestionIdx = questionIdx === numQuestions - 1;

  useKey("Enter", handleEnterClick);

  function handleNextClick() {
    dispatch({ type: "SET_NEXT_QUESTION_IDX" });
  }

  function handleFinishClick() {
    dispatch({ type: "SET_STATUS", status: "finished" });
    const isHighScore = points > highScore;
    if (isHighScore) dispatch({ type: "SET_HIGH_SCORE", highScore: points });
  }

  function handleEnterClick() {
    if (isValidQuestionIdx) handleNextClick();
    else if (isLastQuestionIdx) handleFinishClick();
  }

  if (isValidQuestionIdx)
    return (
      <button className="btn btn-ui" onClick={handleNextClick}>
        Next
      </button>
    );
  if (isLastQuestionIdx)
    return (
      <button className="btn btn-ui" onClick={handleFinishClick}>
        Finish
      </button>
    );
  return <></>;
};
