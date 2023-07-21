import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import "./BtnIncludeAllLevel.scss";
import { CheckBox } from "../../App/CheckBox/CheckBox";

type BtnIncludeAllLevelProps = {
  includeAllLevel: boolean;
  setIncludeAllLevel: (includeAllLevel: boolean) => void;
};

export const BtnIncludeAllLevel = ({
  includeAllLevel,
  setIncludeAllLevel,
}: BtnIncludeAllLevelProps) => {
  function handleBtnIncludeAllLevelClick() {
    setIncludeAllLevel(!includeAllLevel);
  }
  return (
    <div className="btn-include-all-levels-container">
      <label className="btn-include-all-level-label" htmlFor="btn-include-all-level">
        Include all levels
      </label>
      <button
        id="btn-include-all-level"
        className="btn-include-all-level"
        onClick={handleBtnIncludeAllLevelClick}
      >
        <CheckBox checked={includeAllLevel} />
      </button>
    </div>
  );
};
