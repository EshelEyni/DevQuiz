import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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
  console.log("OptionDisplay rendered");
  const { answerIdx } = useSelector((state: RootState) => state.quizModule);
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
