import { FC } from "react";
import { Question as TypeOfQuestion } from "../../../../shared/types/question";
import { BtnQuestionEdit } from "./BtnQuestionEdit";
import { BtnQuestionArchive } from "./BtnQuestionArchive";
import { useNavigate } from "react-router-dom";
import { caplitalizeFirstLetter } from "../../services/utils.service";

type QuestionPreviewProps = {
  question: TypeOfQuestion;
  bcColor: string;
};

export const QuestionPreview: FC<QuestionPreviewProps> = ({
  question: { id, question: questionText, options, correctOption, level, language },
  bcColor,
}) => {
  const navigate = useNavigate();
  function handleBtnEditClick() {
    navigate(`question-edit/${id}`);
  }

  function handleBtnArchiveClick() {}
  return (
    <li className="question-preview" style={{ backgroundColor: bcColor }}>
      <div>
        <div className="question-preview-question">{questionText}</div>
        <div className="question-preview-options">
          {options.map((option, index) => (
            <div key={index} className="question-preview-option">
              {`${index + 1}. ${option}`}
            </div>
          ))}
        </div>
      </div>
      <div className="question-preview-details">
        <p>Level: {caplitalizeFirstLetter(level)}</p>
        <p>Language: {language}</p>
        <p>Correct Option: {correctOption + 1}</p>
      </div>
      <div className="question-preview-btn-container">
        <BtnQuestionEdit handleBtnEditClick={handleBtnEditClick} />
        <BtnQuestionArchive />
      </div>
    </li>
  );
};
