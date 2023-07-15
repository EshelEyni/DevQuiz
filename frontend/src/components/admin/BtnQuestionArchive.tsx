import { BiArchive } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { makeId } from "../../services/utils.service";
import { useRef } from "react";

export const BtnQuestionArchive = () => {
  const btnId = useRef(makeId()).current;
  return (
    <>
      <button
        data-tooltip-id={btnId}
        data-tooltip-content="Archive a question"
        data-tooltip-place="top"
      >
        <BiArchive size={18} />
      </button>
      <Tooltip id={btnId} style={{ fontSize: "12px" }} />
    </>
  );
};
