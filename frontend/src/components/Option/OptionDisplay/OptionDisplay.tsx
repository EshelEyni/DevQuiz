import "./OptionDisplay.scss";
import { useQuiz } from "../../../hooks/useQuiz";

type OptionDisplayProps = {
  option: string;
  optionIdx: number;
  correctOption: number;
  isFocused: boolean;
  handleOptionClick: (answerIdx: number) => void;
};

export const OptionDisplay = ({
  option,
  optionIdx,
  correctOption,
  handleOptionClick,
  isFocused,
}: OptionDisplayProps) => {
  const { answerIdx } = useQuiz();
  const isAnswered = answerIdx !== null;
  const isOptionAnswer = answerIdx === optionIdx;
  const isOptionCorrect = correctOption === optionIdx;
  const optionClassName =
    "btn btn-option " +
    (isOptionAnswer ? "answer " : "") +
    (isAnswered ? (isOptionCorrect ? "correct" : "wrong") : "") +
    (isFocused ? "focused" : "");

  return (
    <button
      className={optionClassName}
      onClick={() => handleOptionClick(optionIdx)}
      disabled={isAnswered}
    >
      {option}
    </button>
  );
};
