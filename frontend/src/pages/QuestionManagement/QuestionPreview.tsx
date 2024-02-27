import { FC, useState } from "react";
import {
  QuestionStatus,
  Question as TypeOfQuestion,
} from "../../../../shared/types/question";
import {
  caplitalizeFirstLetter,
  copyToClipboard,
} from "../../services/utils.service";
import { BtnQuestionEdit } from "../../components/Btns/BtnQuestionEdit";
import { BtnArchiveQuestion } from "../../components/Btns/BtnArchiveQuestion";
import { BtnApproveQuestion } from "../../components/Btns/BtnApproveQuestion";
import { BtnCopyQuestion } from "../../components/Btns/BtnCopyQuestion";
import { BtnMarkQuesitonToEdit } from "../../components/Btns/BtnMarkQuesitonToEdit";
import toast from "react-hot-toast";
import { Button } from "../../components/Btns/Button";
import { TfiFiles } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import { getQuestionDuplications } from "../../store/slices/questionSlice";

type QuestionPreviewProps = {
  question: TypeOfQuestion;
  bcgColor: string;
};

export const QuestionPreview: FC<QuestionPreviewProps> = ({
  question,
  bcgColor,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [status, setStatus] = useState<QuestionStatus>("");
  const {
    id,
    question: questionText,
    options,
    level,
    language,
    correctOption,
  } = question;

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

  function handleGetQuestionDuplications() {
    dispatch(getQuestionDuplications(id));
  }

  function handleStatusClick() {
    setStatus("");
  }

  return (
    <li
      className="white-box-shadow relative flex flex-col justify-between gap-2 overflow-auto rounded-lg p-8"
      style={{ backgroundColor: bcgColor }}
    >
      {status && (
        <div
          className="absolute right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black bg-opacity-60 p-2"
          onClick={handleStatusClick}
        >
          <p className="text-5xl font-semibold capitalize text-gray-100 shadow-xl">
            {status}
          </p>
        </div>
      )}
      <div>
        <header className="mb-2 flex items-center justify-between gap-2">
          <p
            className="cursor-pointer text-3xl font-semibold hover:underline"
            onClick={copyQuestionIdToClipboard}
          >
            Id: {id}
          </p>
        </header>
        <div className="mb-2 text-5xl font-semibold tracking-wide md:text-4xl">
          {questionText}
        </div>
        <div className="ml-4 mt-4 flex flex-col gap-3 text-4xl sm:text-3xl md:text-3xl">
          {options.map((option, index) => (
            <div key={index}>{`${index + 1}. ${option}`}</div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-3 mt-8 flex w-full justify-between gap-6 text-3xl font-semibold">
          <div className="flex-1">
            <p>Level: </p>
            <span>{caplitalizeFirstLetter(level)}</span>
          </div>
          <div className="flex-1">
            <p>Language: </p>
            <span>{language}</span>
          </div>
          <div className="group flex flex-1 flex-col items-center gap-1">
            <p>Correct Option:</p>
            <span className="opacity-0 group-hover:opacity-100">
              {correctOption + 1}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <BtnArchiveQuestion
            question={question}
            setQuestionStatus={setStatus}
            isToggled={true}
          />
          <BtnMarkQuesitonToEdit
            question={question}
            setQuestionStatus={setStatus}
          />
          <BtnQuestionEdit questionId={question.id} />
          <BtnCopyQuestion question={question} />
          <BtnApproveQuestion
            question={question}
            setQuestionStatus={setStatus}
          />
          <Button
            onClickFn={handleGetQuestionDuplications}
            className="flex items-center justify-center gap-3 whitespace-nowrap px-2.5"
          >
            <TfiFiles size={20} color="#000" />
          </Button>
        </div>
      </div>
    </li>
  );
};
