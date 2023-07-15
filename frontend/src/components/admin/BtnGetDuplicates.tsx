import { HiDocumentDuplicate } from "react-icons/hi";

type BtnGetDuplicatesProps = {
  handleBtnGetDuplicatesClick: () => void;
};

export const BtnGetDuplicates = ({ handleBtnGetDuplicatesClick }: BtnGetDuplicatesProps) => {
  return (
    <div>
      <label htmlFor="btn-get-duplicates">Get Duplicates</label>
      <button id="btn-get-duplicates" onClick={handleBtnGetDuplicatesClick}>
        <HiDocumentDuplicate size={18} />
      </button>
    </div>
  );
};
