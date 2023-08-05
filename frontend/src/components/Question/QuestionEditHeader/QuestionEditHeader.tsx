import { FaRegCopy } from "react-icons/fa";
import "./QuestionEditHeader.scss";
import { BtnCopyQuestion } from "../../Btns/BtnCopyQuestion/BtnCopyQuestion";
import { Question } from "../../../../../shared/types/question";

type QuestionEditHeaderProps = {
  question: Question;
};

export const QuestionEditHeader = ({ question }: QuestionEditHeaderProps) => {
  return (
    <header className="quesiton-edit-header">
      <h2>Question Editor</h2>
      <BtnCopyQuestion question={question} />
    </header>
  );
};
