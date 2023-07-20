import { ChangeEvent } from "react";
import { AppDispatch } from "../../../store/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  DifficultyLevels as TypeOfDifficultyLevels,
  systemSettings,
} from "../../../../../shared/types/system";
import { setLevel } from "../../../store/actions/system.actions";
import { caplitalizeFirstLetter } from "../../../services/utils.service";
import { setFilter } from "../../../store/actions/question.actions";

type LevelDropdownProps = {
  isAdminPage?: boolean;
};

export const LevelDropdown = ({ isAdminPage = false }: LevelDropdownProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { systemSettings } = useSelector((state: RootState) => state.systemModule);
  const { difficultyLevels } = systemSettings as systemSettings;
  const { filterBy } = useSelector((state: RootState) => state.questionModule);

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
