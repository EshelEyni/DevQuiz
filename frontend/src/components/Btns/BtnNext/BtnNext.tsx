import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/types";
import { useKey } from "react-use";
import {
  setHighScore,
  setNextQuestionIdx,
  setStatus,
} from "../../../store/slices/quizSlice";
import { useQuiz } from "../../../hooks/useQuiz";

export const BtnNext = () => {
  const { questionIdx, numQuestions, points, highScore } = useQuiz();
  const dispatch: AppDispatch = useDispatch();
  const isValidQuestionIdx = questionIdx >= 0 && questionIdx < numQuestions - 1;
  const isLastQuestionIdx = questionIdx === numQuestions - 1;

  useKey("Enter", handleEnterClick);

  function handleNextClick() {
    dispatch(setNextQuestionIdx());
  }

  function handleFinishClick() {
    dispatch(setStatus("finished"));
    const isHighScore = points > highScore;
    if (isHighScore) dispatch(setHighScore(points));
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
