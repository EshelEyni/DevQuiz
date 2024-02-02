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
  color?: string;
};

export const BtnMarkQuesitonToEdit: FC<BtnMarkQuesitonToEditProps> = ({
  question,
  color = "#f1f3f5",
}) => {
  const dispatch: AppDispatch = useDispatch();
  const btnId = useRef(makeId()).current;
  const isMarkedToBeRevised = question.isMarkedToBeRevised ?? false;

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
        data-tooltip-content="Mark to edit"
        data-tooltip-place="top"
      >
        {isMarkedToBeRevised ? (
          <MdEditOff className="text-5xl md:text-4xl" color={color} />
        ) : (
          <MdModeEditOutline className="text-5xl md:text-4xl" color={color} />
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
