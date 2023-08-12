import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/types";
import { RootState } from "../../../store/store";
import { useState } from "react";
import { LanguageDropdown } from "../../Dropdown/LanguageDropdown/LanguageDropdown";
import { LevelDropdown } from "../../Dropdown/LevelDropdown/LevelDropdown";
import { QuestionSearchInput } from "../QuestionSearchInput/QuestionSearchInput";
import { getDuplicatedQuestions, getQuestions } from "../../../store/actions/question.actions";
import { BtnQuestionSearch } from "../../Btns/BtnQuestionSearch/BtnQuestionSearch";
import { BtnWithLabel } from "../../Btns/BtnWithLabel/BtnWithLabel";
import { CheckBox } from "../../App/CheckBox/CheckBox";
import { HiDocumentDuplicate } from "react-icons/hi";

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
        searchTerm: searchTerm,
        isEditPage: true,
      }),
    );
  }

  function handleBtnIncludeAllLevelClick() {
    setIncludeAllLevel(!includeAllLevel);
  }

  function handleBtnGetDuplicatesClick() {
    const { language } = filterBy;
    dispatch(getDuplicatedQuestions({ language: language }));
  }

  return (
    <div className="flex h-32 w-full items-center justify-between border-b border-indigo-300 bg-indigo-800 px-20">
      <div className="flex items-center justify-center gap-3">
        <LanguageDropdown isAdminPage={true} />
        <LevelDropdown isAdminPage={true} />
        <QuestionSearchInput />
        <BtnWithLabel label="Include all levels" onClickFunc={handleBtnIncludeAllLevelClick}>
          <CheckBox checked={includeAllLevel} />
        </BtnWithLabel>
        <BtnWithLabel label="Get Duplicates" onClickFunc={handleBtnGetDuplicatesClick}>
          <HiDocumentDuplicate size={38} color="white" />
        </BtnWithLabel>
      </div>

      <BtnQuestionSearch handleBtnSearchClick={handleBtnSearchClick} />
    </div>
  );
};
