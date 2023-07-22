import { FaRegCopy } from "react-icons/fa";
import "./QuestionEditHeader.scss";

type QuestionEditHeaderProps = {
  handleBtnCopyQuestionClick: () => void;
};

export const QuestionEditHeader = ({ handleBtnCopyQuestionClick }: QuestionEditHeaderProps) => {
  return (
    <header className="quesiton-edit-header">
      <h2>Question Editor</h2>
      <button onClick={handleBtnCopyQuestionClick}>
        <FaRegCopy size={30} color="#f1f3f5"/>
      </button>
    </header>
  );
};
