import { FC, useRef } from "react";
import { MdOutlineTimer, MdOutlineTimerOff } from "react-icons/md";
import { useQuiz } from "../../hooks/useQuiz";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import { setIsTimerOn } from "../../store/slices/quizSlice";
import { makeId } from "../../services/utils.service";
import { Tooltip } from "react-tooltip";

export const BtnToggleTimer: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isTimerOn } = useQuiz();

  function handleBtnToggleTimerClick() {
    dispatch(setIsTimerOn(!isTimerOn));
  }

  const btnId = useRef(makeId()).current;

  return (
    <>
      <button
        onClick={handleBtnToggleTimerClick}
        data-tooltip-id={btnId}
        data-tooltip-content="Toggle timer"
        data-tooltip-place="top"
      >
        {isTimerOn ? (
          <MdOutlineTimer color="#f1f3f5" className="text-5xl md:text-4xl" />
        ) : (
          <MdOutlineTimerOff color="#f1f3f5" className="text-5xl md:text-4xl" />
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
