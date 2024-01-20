import { useQuiz } from "../../hooks/useQuiz";
import { Button } from "../../components/Btns/Button/Button";
import classnames from "classnames";

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
  const isOptionCorrect = isAnswered && correctOption === optionIdx;
  const isOptionWrong = isAnswered && !isOptionCorrect;

  return (
    <Button
      className={classnames(
        "option-display w-full cursor-pointer rounded-full bg-gray-600 px-10 py-5 text-left text-3xl transition-all duration-300",
        {
          "translate-x-10": isOptionAnswer,
          correct: isOptionCorrect,
          wrong: isOptionWrong,
          "translate-x-5 !bg-gray-800": isFocused,
          "!cursor-not-allowed": isAnswered,
        },
      )}
      onClickFn={() => handleOptionClick(optionIdx)}
      disabled={isAnswered}
    >
      {option}
    </Button>
  );
};
