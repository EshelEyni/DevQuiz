import { ChangeEvent } from "react";
import { AppDispatch } from "../../../store/types";
import { useDispatch } from "react-redux";
import { DifficultyLevels as TypeOfDifficultyLevels } from "../../../../../shared/types/system";
import { caplitalizeFirstLetter } from "../../../services/utils.service";
import { systemSettings } from "../../../config";
import { useQuestion } from "../../../hooks/useQuestion";
import { setFilter } from "../../../store/slices/questionSlice";
import { setLevel } from "../../../store/slices/quizSlice";

type LevelDropdownProps = {
  isAdminPage?: boolean;
};

export const LevelDropdown = ({ isAdminPage = false }: LevelDropdownProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { difficultyLevels } = systemSettings;
  const { filterBy } = useQuestion();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const level = e.target.value as TypeOfDifficultyLevels;
    if (isAdminPage) dispatch(setFilter({ ...filterBy, level }));
    else dispatch(setLevel(level));
  }
  return (
    <div className="select-container">
      <div className="select-wrapper">
        <select className="select" onChange={handleChange}>
          {difficultyLevels.map((level: TypeOfDifficultyLevels) => (
            <option key={level} value={level}>
              {caplitalizeFirstLetter(level)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
