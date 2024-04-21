import { FC } from "react";
import { useQuiz } from "../../hooks/useQuiz";

export const QuizSummary: FC = () => {
  const { questions, answers } = useQuiz();
  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 rounded-lg bg-gray-100 p-4">
      <h1 className="w-full text-center text-4xl font-bold text-gray-800">
        Quiz Summary
      </h1>
      <ul
      className="w-full flex flex-col items-start gap-4"
      >
        {questions.map((question, idx) => (
          <li
            key={question.id}
            className="quiz-summary flex w-full flex-col items-start space-y-2"
          >
            <p className="text-2xl font-semibold text-gray-800 break-words">
              {idx + 1}. {question.question}
            </p>
            {question.correctOption === answers[idx] ? (
              <p className="correct-answer rounded-lg px-3 py-1 text-xl font-medium">
                Your Answer: {question.options[answers[idx]]}
              </p>
            ) : (
              <>
                <p className="correct-answer rounded-lg px-3 py-1 text-xl font-medium">
                  Correct Answer: {question.options[question.correctOption]}
                </p>
                <p className="wrong-answer rounded-lg px-3 py-1 text-xl font-medium">
                  Your Answer: {question.options[answers[idx]]}
                </p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
