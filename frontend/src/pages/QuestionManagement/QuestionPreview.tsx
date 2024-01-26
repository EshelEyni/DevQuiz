import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Question as TypeOfQuestion } from "../../../../shared/types/question";
import {
  caplitalizeFirstLetter,
  copyToClipboard,
} from "../../services/utils.service";
import { BtnQuestionEdit } from "../../components/Btns/BtnQuestionEdit";
import { BtnEntityArchive } from "../../components/Btns/BtnEntityArchive";
import { BtnApproveQuestion } from "../../components/Btns/BtnApproveQuestion";
import { GiCheckMark } from "react-icons/gi";
import { BtnCopyQuestion } from "../../components/Btns/BtnCopyQuestion";
import { BtnMarkQuesitonToEdit } from "../../components/Btns/BtnMarkQuesitonToEdit";
import {
  removeQuestion,
  updateQuestion,
} from "../../store/slices/questionSlice";
import { AppDispatch } from "../../types/app.types";
import toast from "react-hot-toast";

type QuestionPreviewProps = {
  question: TypeOfQuestion;
  bcgColor: string;
};

export const QuestionPreview: FC<QuestionPreviewProps> = ({
  question,
  bcgColor,
}) => {
  const {
    id,
    question: questionText,
    options,
    level,
    language,
    correctOption,
  } = question;
  const isQuestionRevised = question.isMarkedToBeRevised ?? false;

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  function handleBtnEditClick() {
    navigate(`question-edit/${id}`);
  }

  function handleBtnArchiveClick() {
    const isConfirmed = window.confirm(
      "Are you sure you want to archive this question?",
    );
    if (!isConfirmed) return;
    dispatch(removeQuestion(question));
  }

  function handleBtnApproveClick() {
    const isConfirmed = window.confirm(
      "Are you sure you want to approve this question?",
    );
    if (!isConfirmed) return;
    const questionToApprove = { ...question, isRevised: true };
    dispatch(updateQuestion(questionToApprove));
  }

  function handleBtnMarkToEditClick() {
    const questionToMarkToEdit = {
      ...question,
      isMarkedToBeRevised: !isQuestionRevised,
    };
    dispatch(updateQuestion(questionToMarkToEdit));
  }

  function copyQuestionIdToClipboard() {
    copyToClipboard(`Questions/${id}`);
    toast.success("Id copied to clipboard", {
      style: {
        background: "#333",
        color: "#fff",
        fontSize: "13px",
        fontWeight: "600",
      },
    });
  }

  return (
    <li
      className="white-box-shadow flex flex-col justify-between gap-2 overflow-auto rounded-lg p-8"
      style={{ backgroundColor: bcgColor }}
    >
      <div>
        <header className="mb-2 flex items-center justify-between gap-2">
          <p
            className="cursor-pointer text-3xl font-semibold hover:underline"
            onClick={copyQuestionIdToClipboard}
          >
            Id: {id}
          </p>
          {question.isRevised && <GiCheckMark size={24} color="#1d9bf0" />}
        </header>
        <div className="mb-2 text-[2.6rem] font-semibold">{questionText}</div>
        <div className="ml-4 mt-4 flex flex-col gap-2 text-3xl">
          {options.map((option, index) => (
            <div key={index}>{`${index + 1}. ${option}`}</div>
          ))}
        </div>
      </div>
      <div>
        <div className="mt-8 flex justify-between text-3xl font-semibold">
          <div>
            <p>Level: </p>
            <span>{caplitalizeFirstLetter(level)}</span>
          </div>
          <div>
            <p>Language: </p>
            <span>{language}</span>
          </div>
          <div className="group flex flex-col items-center gap-1">
            <p>Correct Option:</p>
            <span className="opacity-0 group-hover:opacity-100">
              {correctOption + 1}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <BtnEntityArchive
            entity="question"
            handleBtnArchiveClick={handleBtnArchiveClick}
          />
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
