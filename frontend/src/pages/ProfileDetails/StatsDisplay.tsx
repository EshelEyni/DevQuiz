import { FC } from "react";
import {
  ProgrammingLanguage,
  QuestionAnswerCount,
} from "../../../../shared/types/system";

type StatsDisplayProps = {
  answerLanguage: ProgrammingLanguage;
  answerCount: QuestionAnswerCount;
  questionCount: QuestionAnswerCount;
};

export const StatsDisplay: FC<StatsDisplayProps> = ({
  answerLanguage,
  answerCount,
  questionCount,
}) => {
  return (
    <div>
      <h1>{answerLanguage}</h1>
      <pre>{JSON.stringify(answerCount, null, 2)}</pre>
      <pre>{JSON.stringify(questionCount, null, 2)}</pre>
    </div>
  );
};
