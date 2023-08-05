import { FC } from "react";
import { MdModeEditOutline, MdEditOff } from "react-icons/md";
import "./BtnMarkQuesitonToEdit.scss";

type BtnMarkQuesitonToEditProps = {
  isMarkedToBeRevised: boolean;
  handleBtnMarkToEditClick: () => void;
};

export const BtnMarkQuesitonToEdit: FC<BtnMarkQuesitonToEditProps> = ({
  isMarkedToBeRevised,
  handleBtnMarkToEditClick,
}) => {
  return (
    <button className="btn-mark-question-to-edit" onClick={handleBtnMarkToEditClick}>
      {isMarkedToBeRevised ? (
        <MdEditOff className="btn-mark-question-to-edit__icon" size={24} color="#f1f3f5" />
      ) : (
        <MdModeEditOutline className="btn-mark-question-to-edit__icon" size={24} color="#f1f3f5" />
      )}
    </button>
  );
};
