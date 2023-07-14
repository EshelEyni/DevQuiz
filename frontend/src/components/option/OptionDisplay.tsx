import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";

type OptionDisplayProps = {
  option: string;
  optionIdx: number;
  correctOption: number;
  answerIdx: number | null;
  points: number;
};

function OptionDisplay({
  option,
  optionIdx,
  correctOption,
  answerIdx,
  points,
}: OptionDisplayProps) {
  const isAnswered = answerIdx !== null;
  const isOptionAnswer = answerIdx === optionIdx;
  const isOptionCorrect = correctOption === optionIdx;
  const optionClassName =
    "btn btn-option " +
    (isOptionAnswer ? "answer " : "") +
    (isAnswered ? (isOptionCorrect ? "correct" : "wrong") : "");

  const dispatch: AppDispatch = useDispatch();

  function handleOptionClick(answerIdx: number) {
    dispatch({ type: "SET_ANSWER_IDX", payload: answerIdx });
    if (isOptionCorrect) dispatch({ type: "SET_POINTS", points });
  }
  return (
    <button
      className={optionClassName}
      onClick={() => handleOptionClick(optionIdx)}
      disabled={isAnswered}
    >
      {option}
    </button>
  );
}

export default OptionDisplay;
