import { useRef } from "react";
import { AiOutlineFileDone, AiOutlineFileText } from "react-icons/ai";
import { makeId } from "../../services/utils.service";
import { Tooltip } from "react-tooltip";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import { Question } from "../../../../shared/types/question";
import { updateQuestion } from "../../store/slices/questionSlice";

type BtnApproveQuestionProps = {
  question: Question;
};

export const BtnApproveQuestion = ({ question }: BtnApproveQuestionProps) => {
  const dispatch: AppDispatch = useDispatch();
  const btnId = useRef(makeId()).current;
  const { isRevised } = question;
  function handleBtnApproveClick() {
    const updatedQuestion = { ...question, isRevised: !isRevised };
    dispatch(updateQuestion(updatedQuestion, "approve"));
  }

  return (
    <>
      <button
        onClick={handleBtnApproveClick}
        data-tooltip-id={btnId}
        data-tooltip-content={
          isRevised ? "Approve a question" : "Remove approval"
        }
        data-tooltip-place="top"
      >
        {isRevised ? (
          <AiOutlineFileDone className="text-5xl md:text-4xl" />
        ) : (
          <AiOutlineFileText className="text-5xl md:text-4xl" />
        )}
      </button>
      <Tooltip
        id={btnId}
        style={{ fontSize: "16px" }}
        className="hidden md:block"
      />
    </>
  );
};
