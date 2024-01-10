import { useDispatch } from "react-redux";
import { DifficultyLevels as TypeOfDifficultyLevels } from "../../../../../shared/types/system";
import { caplitalizeFirstLetter } from "../../../services/utils.service";
import { systemSettings } from "../../../config";
import { useQuestion } from "../../../hooks/useQuestion";
import { setFilter } from "../../../store/slices/questionSlice";
import { setLevel } from "../../../store/slices/quizSlice";
import { Select } from "../../App/Select/Select";
import { useQuiz } from "../../../hooks/useQuiz";
import { AppDispatch } from "../../../types/app.types";

type LevelDropdownProps = {
  isAdminPage?: boolean;
};

export const LevelDropdown = ({ isAdminPage = false }: LevelDropdownProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { difficultyLevels } = systemSettings;
  const { level } = useQuiz();
  const { filterBy } = useQuestion();

  function handleChange(level: TypeOfDifficultyLevels) {
    if (isAdminPage) return dispatch(setFilter({ ...filterBy, level }));
    dispatch(setLevel(level));
  }
  return (
    <Select onChange={handleChange} listHeight={300}>
      <Select.SelectTrigger>
        <button>
          {isAdminPage ? filterBy.level : caplitalizeFirstLetter(level)}
        </button>
      </Select.SelectTrigger>
      <Select.SelectList>
        {difficultyLevels.map((level: TypeOfDifficultyLevels) => (
          <Select.SelectItem key={level} value={level}>
            <span>{caplitalizeFirstLetter(level)}</span>
          </Select.SelectItem>
        ))}
      </Select.SelectList>
    </Select>
  );
};
