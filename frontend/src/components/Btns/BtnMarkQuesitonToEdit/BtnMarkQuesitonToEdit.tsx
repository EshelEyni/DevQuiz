import { FC, useRef } from "react";
import { MdModeEditOutline, MdEditOff } from "react-icons/md";
import { makeId } from "../../../services/utils.service";
import { Tooltip } from "react-tooltip";

type BtnMarkQuesitonToEditProps = {
  isMarkedToBeRevised: boolean;
  handleBtnMarkToEditClick: () => void;
  color?: string;
  size?: number;
};

export const BtnMarkQuesitonToEdit: FC<BtnMarkQuesitonToEditProps> = ({
  isMarkedToBeRevised,
  handleBtnMarkToEditClick,
  color = "#f1f3f5",
  size = 24,
}) => {
  const btnId = useRef(makeId()).current;

  return (
    <>
      <button
        className="btn-mark-question-to-edit"
        onClick={handleBtnMarkToEditClick}
        data-tooltip-id={btnId}
        data-tooltip-content="Mark to edit"
        data-tooltip-place="top"
      >
        {isMarkedToBeRevised ? (
          <MdEditOff className="btn-mark-question-to-edit__icon" size={size} color={color} />
        ) : (
          <MdModeEditOutline
            className="btn-mark-question-to-edit__icon"
            size={size}
            color={color}
          />
        )}
      </button>
      <Tooltip id={btnId} style={{ fontSize: "16px" }} />
    </>
  );
};
