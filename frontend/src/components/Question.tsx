import OptionList from "./option/OptionList";
import { Question as TypeOfQuestion } from "../../../shared/types/question";
import BtnReportQuestion from "./btns/BtnReportQuestion";

type QuestionProps = {
  question: TypeOfQuestion;
};
function Question({ question }: QuestionProps) {

  return (
    <div>
      <div className="question-header">
        <h4>{question.question}</h4>
        <BtnReportQuestion />
      </div>
      <OptionList question={question} />
    </div>
  );
}

export default Question;
