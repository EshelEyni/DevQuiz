import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Question as TypeOfQuestion } from "../../../../../shared/types/question";
import { archiveQuestion } from "../../../store/actions/question.actions";
import { AppDispatch } from "../../../store/types";
import { caplitalizeFirstLetter } from "../../../services/utils.service";
import { BtnQuestionEdit } from "../../Btns/BtnQuestionEdit/BtnQuestionEdit";
import { BtnQuestionArchive } from "../../Btns/BtnQuestionArchive/BtnQuestionArchive";
import "./QuestionPreview.scss";

type QuestionPreviewProps = {
  question: TypeOfQuestion;
  bcColor: string;
};

export const QuestionPreview: FC<QuestionPreviewProps> = ({
  question: { id, question: questionText, options, correctOption, level, language },
  bcColor,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  function handleBtnEditClick() {
    navigate(`question-edit/${id}`);
  }

  function handleBtnArchiveClick() {
    const isConfirmed = window.confirm("Are you sure you want to archive this question?");
    if (!isConfirmed) return;
    dispatch(archiveQuestion(id));
  }
  return (
    <li className="question-preview" style={{ backgroundColor: bcColor }}>
      <div>
        <p>{id}</p>
        <div className="question-preview-question">{questionText}</div>
        <div className="question-preview-options">
          {options.map((option, index) => (
            <div key={index} className="question-preview-option">
              {`${index + 1}. ${option}`}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="question-preview-details">
          <div className="question-preview-details-item">
            <p>Level: </p>
            <span>{caplitalizeFirstLetter(level)}</span>
          </div>
          <div className="question-preview-details-item">
            <p>Language: </p>
            <span>{language}</span>
          </div>
          <div className="question-preview-details-item">
            <p>Correct Option:</p>
            <span className="correct-option-num">{correctOption + 1}</span>
          </div>
        </div>
        <div className="question-preview-btn-container">
          <BtnQuestionEdit handleBtnEditClick={handleBtnEditClick} />
          <BtnQuestionArchive handleBtnArchiveClick={handleBtnArchiveClick} />
        </div>
      </div>
    </li>
  );
};
