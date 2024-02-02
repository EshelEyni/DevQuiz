import { useRef } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { makeId } from "../../services/utils.service";
import { Tooltip } from "react-tooltip";

type BtnApproveQuestionProps = {
  handleBtnApproveClick: () => void;
  color?: string;
};

export const BtnApproveQuestion = ({
  handleBtnApproveClick,
  color = "#f1f3f5",
}: BtnApproveQuestionProps) => {
  const btnId = useRef(makeId()).current;
  return (
    <>
      <button
        onClick={handleBtnApproveClick}
        data-tooltip-id={btnId}
        data-tooltip-content="Approve a question"
        data-tooltip-place="top"
      >
        <AiOutlineFileDone color={color} className="text-5xl md:text-4xl" />
      </button>
      <Tooltip
        id={btnId}
        style={{ fontSize: "16px" }}
        className="hidden md:block"
      />
    </>
  );
};
