import { HiDocumentDuplicate } from "react-icons/hi";
import "./BtnGetDuplicates.scss";

type BtnGetDuplicatesProps = {
  handleBtnGetDuplicatesClick: () => void;
};

export const BtnGetDuplicates = ({ handleBtnGetDuplicatesClick }: BtnGetDuplicatesProps) => {
  return (
    <div className="btn-get-duplicates-container">
      <label htmlFor="btn-get-duplicates" className="btn-get-duplicates-label">
        Get Duplicates
      </label>
      <button id="btn-get-duplicates" onClick={handleBtnGetDuplicatesClick}>
        <HiDocumentDuplicate size={38} color="white" />
      </button>
    </div>
  );
};
