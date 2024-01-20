import { BiArchive } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { makeId } from "../../../services/utils.service";
import { useRef } from "react";

type BtnQuestionArchiveProps = {
  entity: string;
  handleBtnArchiveClick: () => void;
  color?: string;
};

export const BtnEntityArchive = ({
  entity,
  handleBtnArchiveClick,
  color = "#000",
}: BtnQuestionArchiveProps) => {
  const btnId = useRef(makeId()).current;
  return (
    <>
      <button
        data-tooltip-id={btnId}
        data-tooltip-content={`Archive a ${entity}`}
        data-tooltip-place="top"
        onClick={handleBtnArchiveClick}
      >
        <BiArchive size={22} color={color} />
      </button>
      <Tooltip
        id={btnId}
        style={{ fontSize: "16px" }}
        className="hidden md:block"
      />
    </>
  );
};
