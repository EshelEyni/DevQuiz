import OptionList from "./option/OptionList";
import { Question as TypeOfQuestion } from "../../../shared/types/question";
import BtnReportQuestion from "./btns/BtnReportQuestion";

type QuestionProps = {
  question: TypeOfQuestion;
  answerIdx: number | null;
};
function Question({ question, answerIdx }: QuestionProps) {
  return (
    <div>
      <div className="question-header">
        <h4>{question.question}</h4>
        <BtnReportQuestion />
      </div>
      <OptionList question={question} answerIdx={answerIdx} />
    </div>
  );
}

export default Question;
