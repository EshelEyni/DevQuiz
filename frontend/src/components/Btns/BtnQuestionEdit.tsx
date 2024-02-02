import { BiEdit } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { makeId } from "../../services/utils.service";
import { useRef } from "react";

type BtnQuestionEditProps = {
  handleBtnEditClick: () => void;
};

export const BtnQuestionEdit = ({
  handleBtnEditClick,
}: BtnQuestionEditProps) => {
  const btnId = useRef(makeId()).current;
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
