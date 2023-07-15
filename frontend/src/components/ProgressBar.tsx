import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type ProgressBarProps = {
  index: number;
  numOfQuestions: number;
  points: number;
  maxPossiblePoints: number;
};

function ProgressBar({ index, numOfQuestions, points, maxPossiblePoints }: ProgressBarProps) {
  const { answerIdx } = useSelector((state: RootState) => state.quizModule);
  return (
    <header className="progress">
      <progress value={index + Number(answerIdx !== null)} max={numOfQuestions}></progress>
      <p>
        Question <strong>{index + 1}</strong>/{numOfQuestions}
      </p>

      <p>
        Points <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
}

export default ProgressBar;
