import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/types";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import LanguageDropdown from "../dropdown/LanguageDropdown";
import LevelDropdown from "../dropdown/LevelDropdown";
import { QuestionSearchInput } from "./QuestionSearchInput";
import { getQuestions } from "../../store/actions/question.actions";
import { BtnQuestionSearch } from "./BtnQuestionSearch";

export const QuestionSearchBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filterBy } = useSelector((state: RootState) => state.questionModule);

  function handleBtnSearchClick() {
    const { language, level, searchTerm } = filterBy;
    dispatch(
      getQuestions({
        language: language,
        level: level,
        page: 1,
        limit: 1000,
        searchTerm: searchTerm,
      })
    );
  }

  return (
    <div className="question-search-bar">
      <div className="question-search-bar-input-container">
        <LanguageDropdown isAdminPage={true} />
        <LevelDropdown isAdminPage={true} />
        <QuestionSearchInput />
      </div>

      <BtnQuestionSearch handleBtnSearchClick={handleBtnSearchClick} />
    </div>
  );
};
