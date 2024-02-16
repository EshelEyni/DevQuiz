import { FC, useRef } from "react";
import { MdModeEditOutline, MdEditOff } from "react-icons/md";
import { makeId } from "../../services/utils.service";
import { Tooltip } from "react-tooltip";
import { Question } from "../../../../shared/types/question";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import { updateQuestion } from "../../store/slices/questionSlice";

type BtnMarkQuesitonToEditProps = {
  question: Question;
};

export const BtnMarkQuesitonToEdit: FC<BtnMarkQuesitonToEditProps> = ({
  question,
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
  }

  return (
    <>
      <button
        onClick={handleBtnMarkToEditClick}
        data-tooltip-id={btnId}
        data-tooltip-content={
          isMarkedToBeRevised
            ? "Mark question to be revised"
            : "Unmark question to be revised"
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
