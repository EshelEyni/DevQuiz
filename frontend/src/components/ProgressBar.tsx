type ProgressBarProps = {
  index: number;
  numOfQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answerIdx: number | null;
};

function ProgressBar({
  index,
  numOfQuestions,
  points,
  maxPossiblePoints,
  answerIdx,
}: ProgressBarProps) {
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
