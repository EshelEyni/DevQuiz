import React from "react";
import { AppDispatch } from "../../store/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { difficultyLevels } from "../../../../shared/types/system";
import { setLevel } from "../../store/actions/system.actions";

export default function LevelDropdown() {
  const dispatch: AppDispatch = useDispatch();
  const {
    systemSettings: { difficultyLevels },
  } = useSelector((state: RootState) => state.systemModule);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const level = e.target.value as difficultyLevels;
    dispatch(setLevel(level));
  }
  return (
    <div className="select-container">
      <div className="select-wrapper">
        <select className="select" onChange={handleChange}>
          {difficultyLevels.map((level: difficultyLevels) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
