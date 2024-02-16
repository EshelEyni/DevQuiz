import { FC, useRef } from "react";
import { MdModeEditOutline, MdEditOff } from "react-icons/md";
import { makeId } from "../../services/utils.service";
import { Tooltip } from "react-tooltip";
import { Question, QuestionStatus } from "../../../../shared/types/question";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import { updateQuestion } from "../../store/slices/questionSlice";

type BtnMarkQuesitonToEditProps = {
  question: Question;
  setQuestionStatus?: React.Dispatch<React.SetStateAction<QuestionStatus>>;
};

export const BtnMarkQuesitonToEdit: FC<BtnMarkQuesitonToEditProps> = ({
  question,
  setQuestionStatus,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const btnId = useRef(makeId()).current;
  const { isMarkedToBeRevised } = question;

  function handleBtnMarkToEditClick() {
    const updatedQuestion = {
      ...question,
      isMarkedToBeRevised: !question.isMarkedToBeRevised,
    };

    
    dispatch(updateQuestion(updatedQuestion, "mark"));
    if (updatedQuestion.isMarkedToBeRevised) setQuestionStatus?.("marked");
  }

  return (
    <>
      <button
        onClick={handleBtnMarkToEditClick}
        data-tooltip-id={btnId}
        data-tooltip-content={
          isMarkedToBeRevised
            ? "Unmark question to be revised"
            : "Mark question to be revised"
        }
        data-tooltip-place="top"
      >
        {isMarkedToBeRevised ? (
          <MdEditOff className="text-5xl md:text-4xl" />
        ) : (
          <MdModeEditOutline className="text-5xl md:text-4xl" />
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
