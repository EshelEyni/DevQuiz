import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { Question } from "../../../../shared/types/question";
import OptionDisplay from "./OptionDisplay";

type OptionListProps = {
  question: Question;
  answerIdx: number | null;
};

function OptionList({ question, answerIdx }: OptionListProps) {
  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <OptionDisplay
          key={idx}
          option={option}
          optionIdx={idx}
          correctOption={question.correctOption}
          answerIdx={answerIdx}
          points={question.points}
        />
      ))}
    </div>
  );
}

export default OptionList;
