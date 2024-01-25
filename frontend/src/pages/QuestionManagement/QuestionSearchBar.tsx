import { useDispatch } from "react-redux";
import { useState } from "react";
import { CheckBox } from "../../components/App/CheckBox";
import { HiDocumentDuplicate } from "react-icons/hi";
import { useQuestion } from "../../hooks/useQuestion";
import {
  getDuplicatedQuestions,
  getQuestions,
  setFilter,
} from "../../store/slices/questionSlice";
import { useKey } from "react-use";
import { AppDispatch } from "../../types/app.types";
import { Select } from "../../components/App/Select";
import { systemSettings } from "../../config";
import { ProgrammingLanguage } from "../../../../shared/types/system";
import { DifficultyLevels as TypeOfDifficultyLevels } from "../../../../shared/types/system";
import { Button } from "../../components/Btns/Button";

export const QuestionSearchBar = () => {
  const dispatch: AppDispatch = useDispatch();
  useKey("Enter", onSearch);
  const { filterBy } = useQuestion();
  const { programmingLanguages, difficultyLevels } = systemSettings;
  const [includeAllLevel, setIncludeAllLevel] = useState(false);

  function handleChangeLangSelect(language: ProgrammingLanguage) {
    dispatch(setFilter({ ...filterBy, language }));
  }

  function handleChangeDifficultySelect(level: TypeOfDifficultyLevels) {
    dispatch(setFilter({ ...filterBy, level }));
  }

  function handleInputSearchTermChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const searchTerm = event.target.value;
    dispatch(setFilter({ ...filterBy, searchTerm }));
  }

  function onSearch() {
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
    <div className="min-h-32 flex w-full flex-col items-center justify-between border-b border-gray-300 bg-gray-800 px-4 py-4 md:flex-row md:px-20">
      <div className="flex flex-wrap items-center gap-3 md:justify-center">
        <Select onChange={handleChangeLangSelect}>
          <Select.SelectTrigger
            className="h-14 w-52 cursor-pointer rounded-xl 
            bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300"
          >
            <button type="button">{filterBy.language}</button>
          </Select.SelectTrigger>
          <Select.SelectList
            className="z-[1500] mt-1 w-full  min-w-[100px] cursor-pointer 
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300"
          >
            {Object.keys(programmingLanguages).map((lang: string) => (
              <Select.SelectItem
                key={lang}
                value={lang}
                className="flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100"
              >
                <span>{lang}</span>
              </Select.SelectItem>
            ))}
          </Select.SelectList>
        </Select>
        <Select onChange={handleChangeDifficultySelect}>
          <Select.SelectTrigger
            className="h-14 w-52 cursor-pointer rounded-xl 
            bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300"
          >
            <button type="button">{filterBy.level}</button>
          </Select.SelectTrigger>
          <Select.SelectList
            className="z-[1500] mt-1 w-full  min-w-[100px] cursor-pointer 
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300"
          >
            {difficultyLevels.map((lang: string) => (
              <Select.SelectItem
                key={lang}
                value={lang}
                className="flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100"
              >
                <span className="capitalize">{lang}</span>
              </Select.SelectItem>
            ))}
          </Select.SelectList>
        </Select>

        <input
          className="h-14 w-96 rounded-xl bg-gray-700 px-3 text-2xl leading-5"
          type="text"
          value={filterBy.searchTerm}
          placeholder="Search for a question"
          onChange={handleInputSearchTermChange}
        />
        <Button
          onClickFn={handleBtnIncludeAllLevelClick}
          className="flex flex-col items-center justify-center whitespace-nowrap p-2.5"
        >
          <span className="text-2xl font-semibold">
            {includeAllLevel ? "Exclude all levels" : "Include all levels"}
          </span>
          <CheckBox checked={includeAllLevel} />
        </Button>

        <Button
          onClickFn={handleBtnGetDuplicatesClick}
          className="flex flex-col items-center justify-center whitespace-nowrap p-2.5"
        >
          <span className="text-2xl font-semibold">Get Duplicates</span>
          <HiDocumentDuplicate size={38} color="white" />
        </Button>
      </div>

      <Button
        onClickFn={onSearch}
        className="flex h-14 items-center justify-center self-end rounded-full bg-gray-700 p-10 text-2xl leading-5 text-gray-100 md:self-center"
      >
        <span className="text-3xl capitalize">search</span>
      </Button>
    </div>
  );
};
