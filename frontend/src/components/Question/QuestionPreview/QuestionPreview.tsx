import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Question as TypeOfQuestion } from "../../../../../shared/types/question";
import { archiveQuestion, updateQuestion } from "../../../store/actions/question.actions";
import { AppDispatch } from "../../../store/types";
import { caplitalizeFirstLetter, copyToClipboard } from "../../../services/utils.service";
import { BtnQuestionEdit } from "../../Btns/BtnQuestionEdit/BtnQuestionEdit";
import { BtnEntityArchive } from "../../Btns/BtnEntityArchive/BtnEntityArchive";
import "./QuestionPreview.scss";
import { BtnApproveQuestion } from "../../Btns/BtnApproveQuestion/BtnApproveQuestion";
import { GiCheckMark } from "react-icons/gi";
import { BtnCopyQuestion } from "../../Btns/BtnCopyQuestion/BtnCopyQuestion";
import { BtnMarkQuesitonToEdit } from "../../Btns/BtnMarkQuesitonToEdit/BtnMarkQuesitonToEdit";

type QuestionPreviewProps = {
  question: TypeOfQuestion;
  bcgColor: string;
};

export const QuestionPreview: FC<QuestionPreviewProps> = ({ question, bcgColor }) => {
  const { id, question: questionText, options, level, language, correctOption } = question;
  const isQuestionRevised = question.isMarkedToBeRevised ?? false;

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  function handleBtnEditClick() {
    navigate(`question-edit/${id}`);
  }

  function handleBtnArchiveClick() {
    const isConfirmed = window.confirm("Are you sure you want to archive this question?");
    if (!isConfirmed) return;
    dispatch(archiveQuestion(question));
  }

  function handleBtnApproveClick() {
    const isConfirmed = window.confirm("Are you sure you want to approve this question?");
    if (!isConfirmed) return;
    const questionToApprove = { ...question, isRevised: true };
    dispatch(updateQuestion(questionToApprove));
  }

  function handleBtnMarkToEditClick() {
    const questionToMarkToEdit = { ...question, isMarkedToBeRevised: !isQuestionRevised };
    dispatch(updateQuestion(questionToMarkToEdit));
  }

  function copyQuestionIdToClipboard() {
    copyToClipboard(`Questions/${id}`);
  }

  return (
    <li className="question-preview" style={{ backgroundColor: bcgColor }}>
      <div>
        <header>
          <p className="question-id" onClick={copyQuestionIdToClipboard}>
            Id: {id}
          </p>
          {question.isRevised && <GiCheckMark size={24} color="#1d9bf0" />}
        </header>
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
          <BtnEntityArchive entity="question" handleBtnArchiveClick={handleBtnArchiveClick} />
          <BtnMarkQuesitonToEdit
            isMarkedToBeRevised={isQuestionRevised}
            handleBtnMarkToEditClick={handleBtnMarkToEditClick}
            color="#000"
            size={22}
          />
          <BtnQuestionEdit handleBtnEditClick={handleBtnEditClick} size={22} />
          <BtnCopyQuestion question={question} color="#000" size={22} />
          <BtnApproveQuestion
            handleBtnApproveClick={handleBtnApproveClick}
            color="#000"
            size={22}
          />
        </div>
      </div>
    </li>
  );
};
