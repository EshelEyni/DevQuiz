import { AiOutlineFileDone } from "react-icons/ai";
import { makeId } from "../../../services/utils.service";
import { Tooltip } from "react-tooltip";

type BtnApproveQuestionProps = {
  handleBtnApproveClick: () => void;
};

export const BtnApproveQuestion = ({ handleBtnApproveClick }: BtnApproveQuestionProps) => {
  const btnId = makeId();
  return (
    <>
      <button
        onClick={handleBtnApproveClick}
        data-tooltip-id={btnId}
        data-tooltip-content="Approve a question"
        data-tooltip-place="top"
      >
        <AiOutlineFileDone size={24} color="#f1f3f5" />
      </button>
      <Tooltip id={btnId} style={{ fontSize: "16px" }} />
    </>
  );
};
