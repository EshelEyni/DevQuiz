import { useDispatch } from "react-redux";
import { ProgrammingLanguage } from "../../../../../shared/types/system";
import { AppDispatch } from "../../../store/types";
import { systemSettings } from "../../../config";
import { useQuestion } from "../../../hooks/useQuestion";
import { setFilter } from "../../../store/slices/questionSlice";
import { resetQuizState, setLanguage } from "../../../store/slices/quizSlice";

type LanguageDropdownProps = {
  isAdminPage?: boolean;
};

export const LanguageDropdown = ({
  isAdminPage = false,
}: LanguageDropdownProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { programmingLanguages } = systemSettings;
  const { filterBy } = useQuestion();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const language = e.target.value as ProgrammingLanguage;
    if (isAdminPage) dispatch(setFilter({ ...filterBy, language }));
    else {
      dispatch(setLanguage(language));
      dispatch(resetQuizState());
    }
  }

  return (
    <div className="select-container">
      <div className="select-wrapper">
        <select className="select" onChange={handleChange}>
          {Object.keys(programmingLanguages).map((lang: string) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
