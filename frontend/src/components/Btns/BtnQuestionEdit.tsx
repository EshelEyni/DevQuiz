import { BiEdit } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { makeId } from "../../services/utils.service";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import { setIsTimerOn } from "../../store/slices/quizSlice";
import { useQuiz } from "../../hooks/useQuiz";

type BtnQuestionEditProps = {
  questionId: string;
};

export const BtnQuestionEdit = ({ questionId }: BtnQuestionEditProps) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { isTimerOn } = useQuiz();
  const btnId = useRef(makeId()).current;

  function handleBtnEditClick() {
    if (isTimerOn) dispatch(setIsTimerOn(false));
    navigate(`question-edit/${questionId}`);
  }
  return (
    <>
      <button
        data-tooltip-id={btnId}
        data-tooltip-content="Edit a question"
        data-tooltip-place="top"
        onClick={handleBtnEditClick}
      >
        <BiEdit className="text-5xl md:text-4xl" />
      </button>
      <Tooltip
        id={btnId}
        style={{ fontSize: "16px" }}
        className="hidden md:block"
      />
    </>
  );
};
