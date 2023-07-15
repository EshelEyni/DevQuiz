import { FC } from "react";
import { Question as TypeOfQuestion } from "../../../../shared/types/question";
import { QuestionPreview } from "./QuestionPreview";
import { getRandomBrightColor } from "../../services/utils.service";

type QuestionListProps = {
  questions: TypeOfQuestion[];
};
export const QuestionList: FC<QuestionListProps> = ({ questions }) => {
  return (
    <ul className="question-list">
      {questions.map((question, i) => (
        <QuestionPreview key={question.id} question={question} bcColor={getRandomBrightColor(i)} />
      ))}
    </ul>
  );
};
