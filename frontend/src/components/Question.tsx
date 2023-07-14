import OptionList from "./option/OptionList";
import { Question as TypeOfQuestion } from "../../../shared/types/question";

type QuestionProps = {
  question: TypeOfQuestion;
  answerIdx: number | null;
};
function Question({ question, answerIdx }: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <OptionList question={question} answerIdx={answerIdx} />
    </div>
  );
}

export default Question;
