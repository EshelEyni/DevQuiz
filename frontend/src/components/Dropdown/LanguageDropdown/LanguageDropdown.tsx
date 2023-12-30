import { useDispatch } from "react-redux";
import { ProgrammingLanguage } from "../../../../../shared/types/system";
import { AppDispatch } from "../../../store/types";
import { systemSettings } from "../../../config";
import { useQuestion } from "../../../hooks/useQuestion";
import { setFilter } from "../../../store/slices/questionSlice";
import { resetQuizState, setLanguage } from "../../../store/slices/quizSlice";
import { Select } from "../../App/Select/Select";
import { useQuiz } from "../../../hooks/useQuiz";

type LanguageDropdownProps = {
  isAdminPage?: boolean;
};

export const LanguageDropdown = ({
  isAdminPage = false,
}: LanguageDropdownProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { programmingLanguages } = systemSettings;
  const { language } = useQuiz();
  const { filterBy } = useQuestion();

  function handleChange(language: ProgrammingLanguage) {
    if (isAdminPage) return dispatch(setFilter({ ...filterBy, language }));
    dispatch(setLanguage(language));
    dispatch(resetQuizState());
  }

  return (
    <Select onChange={handleChange} listHeight={300}>
      <Select.SelectTrigger>
        <button>{isAdminPage ? filterBy.language : language}</button>
      </Select.SelectTrigger>
      <Select.SelectList>
        {Object.keys(programmingLanguages).map((lang: string) => (
          <Select.SelectItem key={lang} value={lang}>
            <span>{lang}</span>
          </Select.SelectItem>
        ))}
      </Select.SelectList>
    </Select>
  );
};
