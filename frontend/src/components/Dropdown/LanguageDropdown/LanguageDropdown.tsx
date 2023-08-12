import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  ProgrammingLanguage,
  systemSettings,
} from "../../../../../shared/types/system";
import { AppDispatch } from "../../../store/types";
import { setLanguage } from "../../../store/actions/system.actions";
import { setFilter } from "../../../store/actions/question.actions";
import { resetQuiz } from "../../../store/actions/quiz.actions";

type LanguageDropdownProps = {
  isAdminPage?: boolean;
};

export const LanguageDropdown = ({
  isAdminPage = false,
}: LanguageDropdownProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { systemSettings } = useSelector(
    (state: RootState) => state.systemModule,
  );
  const { programmingLanguages } = systemSettings as systemSettings;
  const { filterBy } = useSelector((state: RootState) => state.questionModule);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const language = e.target.value as ProgrammingLanguage;
    if (isAdminPage) dispatch(setFilter({ ...filterBy, language }));
    else {
      dispatch(setLanguage(language));
      dispatch(resetQuiz());
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
