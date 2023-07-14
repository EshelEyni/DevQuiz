import React from "react";
import { AppDispatch } from "../../store/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  difficultyLevels as TypeOfDifficultyLevels,
  systemSettings,
} from "../../../../shared/types/system";
import { setLevel } from "../../store/actions/system.actions";
import { caplitalizeFirstLetter } from "../../services/utils.service";

export default function LevelDropdown() {
  const dispatch: AppDispatch = useDispatch();
  const { systemSettings } = useSelector((state: RootState) => state.systemModule);
  const { difficultyLevels } = systemSettings as systemSettings;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const level = e.target.value as TypeOfDifficultyLevels;
    dispatch(setLevel(level));
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
}
