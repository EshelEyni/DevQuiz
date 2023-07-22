import { BiEdit } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { makeId } from "../../../services/utils.service";
import { useRef } from "react";

type BtnQuestionEditProps = {
  handleBtnEditClick: () => void;
  size?: number;
};

export const BtnQuestionEdit = ({ handleBtnEditClick, size = 18 }: BtnQuestionEditProps) => {
  const btnId = useRef(makeId()).current;
  return (
    <>
      <button
        className="btn-question-edit"
        data-tooltip-id={btnId}
        data-tooltip-content="Edit a question"
        data-tooltip-place="top"
        onClick={handleBtnEditClick}
      >
        <BiEdit size={size} />
      </button>
      <Tooltip id={btnId} style={{ fontSize: "16px" }} />
    </>
  );
};
