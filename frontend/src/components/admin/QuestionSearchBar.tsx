import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/types";
import { RootState } from "../../store/store";
import { useState } from "react";
import LanguageDropdown from "../dropdown/LanguageDropdown";
import LevelDropdown from "../dropdown/LevelDropdown";
import { QuestionSearchInput } from "./QuestionSearchInput";
import { getDuplicatedQuestions, getQuestions } from "../../store/actions/question.actions";
import { BtnQuestionSearch } from "./BtnQuestionSearch";
import { BtnIncludeAllLevel } from "./BtnIncludeAllLevel";
import { BtnGetDuplicates } from "./BtnGetDuplicates";

export const QuestionSearchBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filterBy } = useSelector((state: RootState) => state.questionModule);
  const [includeAllLevel, setIncludeAllLevel] = useState(false);

  function handleBtnSearchClick() {
    const { language, level, searchTerm } = filterBy;
    dispatch(
      getQuestions({
        language: language,
        level: includeAllLevel ? undefined : level,
        page: 1,
        limit: 1000,
        searchField: "question",
        searchTerm: searchTerm,
      })
    );
  }

  function handleBtnGetDuplicatesClick() {
    const { language } = filterBy;
    dispatch(getDuplicatedQuestions({ language: language }));
  }

  return (
    <div className="question-search-bar">
      <div className="question-search-bar-input-container">
        <LanguageDropdown isAdminPage={true} />
        <LevelDropdown isAdminPage={true} />
        <QuestionSearchInput />
        <BtnIncludeAllLevel
          includeAllLevel={includeAllLevel}
          setIncludeAllLevel={setIncludeAllLevel}
        />
        <BtnGetDuplicates handleBtnGetDuplicatesClick={handleBtnGetDuplicatesClick} />
      </div>

      <BtnQuestionSearch handleBtnSearchClick={handleBtnSearchClick} />
    </div>
  );
};
