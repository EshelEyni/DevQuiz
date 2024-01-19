import { useQuiz } from "../../hooks/useQuiz";

export const ProgressBar = () => {
  const { numQuestions, questionIdx, points, maxPossiblePoints, answerIdx } =
    useQuiz();
  return (
    <div className="mb-16 grid grid-cols-2 gap-5 text-2xl">
      <progress
        value={questionIdx + Number(answerIdx !== null)}
        max={numQuestions}
        className="quiz-progress-bar col-span-full h-4 w-full"
      />
      <p>
        Question <strong>{questionIdx + 1}</strong>/{numQuestions}
      </p>

      <p className="justify-self-end text-end">
        Points <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </div>
  );
};
