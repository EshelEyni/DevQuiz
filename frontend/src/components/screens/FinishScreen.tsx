import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/types";
import { getQuestions } from "../../store/actions/quiz.actions";
import { RootState } from "../../store/store";

type FinishScreenProps = {
  points: number;
  maxPossiblePoints: number;
  highScore: number;
};

function FinishScreen({ points, maxPossiblePoints, highScore }: FinishScreenProps) {
  const dispatch: AppDispatch = useDispatch();
  const { language, level, offSet } = useSelector((state: RootState) => state.systemModule);
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥳";
  else if (percentage >= 80) emoji = "😎";
  else if (percentage >= 60) emoji = "🙂";
  else emoji = "😞";

  function handleNewQuizClick() {
    dispatch(getQuestions({ language, level, offSet }));
  }

  function handleRestartClick() {
    dispatch({ type: "SET_STATUS", status: "ready" });
    dispatch({ type: "RESET_QUIZ" });
  }
  return (
    <>
      <p className="result">
        <span className="emoji">{emoji}</span>
        You scored <strong>{points}</strong> out of <strong>{maxPossiblePoints}</strong> points. (
        {Math.ceil(percentage)})
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button className="btn btn-ui" onClick={handleNewQuizClick}>
        Start New Quiz
      </button>
      <button className="btn btn-ui" onClick={handleRestartClick}>
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
