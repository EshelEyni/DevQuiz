import { useQuiz } from "../../../hooks/useQuiz";
import "./ProgressBar.scss";

export const ProgressBar = () => {
  const { numQuestions, questionIdx, points, maxPossiblePoints, answerIdx } =
    useQuiz();
  return (
    <header className="progress">
      <progress
        value={questionIdx + Number(answerIdx !== null)}
        max={numQuestions}
      ></progress>
      <p>
        Question <strong>{questionIdx + 1}</strong>/{numQuestions}
      </p>

      <p>
        Points <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
};
