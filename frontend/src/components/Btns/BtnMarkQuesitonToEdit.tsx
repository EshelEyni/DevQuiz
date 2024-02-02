import { FC, useRef } from "react";
import { MdModeEditOutline, MdEditOff } from "react-icons/md";
import { makeId } from "../../services/utils.service";
import { Tooltip } from "react-tooltip";

type BtnMarkQuesitonToEditProps = {
  isMarkedToBeRevised: boolean;
  handleBtnMarkToEditClick: () => void;
  color?: string;
};

export const BtnMarkQuesitonToEdit: FC<BtnMarkQuesitonToEditProps> = ({
  isMarkedToBeRevised,
  handleBtnMarkToEditClick,
  color = "#f1f3f5",
}) => {
  const btnId = useRef(makeId()).current;

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
