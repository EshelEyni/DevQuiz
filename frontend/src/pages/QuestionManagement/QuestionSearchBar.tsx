import { useDispatch } from "react-redux";
import { useState } from "react";
import { CheckBox } from "../../components/App/CheckBox";
import { HiDocumentDuplicate } from "react-icons/hi";
import {
  getDuplicatedQuestions,
  getQuestions,
} from "../../store/slices/questionSlice";
import { useKey } from "react-use";
import { AppDispatch } from "../../types/app.types";
import { Select } from "../../components/App/Select";
import { systemSettings } from "../../config";
import { ProgrammingLanguage } from "../../../../shared/types/system";
import { DifficultyLevels as TypeOfDifficultyLevels } from "../../../../shared/types/system";
import { Button } from "../../components/Btns/Button";

type LevelOrAll = TypeOfDifficultyLevels | "all";

export const QuestionSearchBar = () => {
  const dispatch: AppDispatch = useDispatch();
  useKey("Enter", onSearch);
  const { programmingLanguages, difficultyLevels } = systemSettings;
  const [language, setLanguage] = useState<ProgrammingLanguage>("HTML");
  const [level, setLevel] = useState<LevelOrAll>("beginner");
  const [searchTerm, setSearchTerm] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [isMarked, setIsMarked] = useState(false);

  function handleChangeLangSelect(language: ProgrammingLanguage) {
    setLanguage(language);
  }

  function handleChangeDifficultySelect(level: LevelOrAll) {
    setLevel(level);
  }

  function handleInputSearchTermChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  }

  function onSearch() {
    dispatch(
      getQuestions({
        language,
        level: level === "all" ? undefined : level,
        page: 1,
        limit: 0,
        searchTerm,
        isMarkedToBeRevised: isMarked,
        isRevised: isApproved,
      }),
    );
  }

  function handleApprovedClick() {
    setIsMarked(false);
    setIsApproved(!isApproved);
  }

  function handleMarkedClick() {
    setIsApproved(false);
    setIsMarked(!isMarked);
  }

  function handleBtnGetDuplicatesClick() {
    dispatch(getDuplicatedQuestions({ language }));
  }

  return (
    <div className="min-h-32 flex w-full flex-col items-center justify-between border-b border-gray-300 bg-gray-800 px-4 py-4 md:flex-row md:px-20">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-3">
          <Select onChange={handleChangeLangSelect}>
            <Select.SelectTrigger
              className="h-14 w-52 cursor-pointer rounded-xl 
            bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300"
            >
              <button type="button">{language}</button>
            </Select.SelectTrigger>
            <Select.SelectList
              className="z-[1500] mt-1 w-52  min-w-[100px] cursor-pointer 
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
              <button type="button">{level}</button>
            </Select.SelectTrigger>
            <Select.SelectList
              className="z-[1500] mt-1 w-52  min-w-[100px] cursor-pointer 
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
              <Select.SelectItem
                value={"all"}
                className="flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100"
              >
                <span className="capitalize">all</span>
              </Select.SelectItem>
            </Select.SelectList>
          </Select>

          <input
            className="h-14 w-96 rounded-xl bg-gray-700 px-3 text-2xl leading-5"
            type="text"
            value={searchTerm}
            placeholder="Search for a question"
            onChange={handleInputSearchTermChange}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            onClickFn={handleApprovedClick}
            className="flex items-center justify-center gap-1 whitespace-nowrap p-2.5"
          >
            <span className="text-2xl font-semibold">Approved only</span>
            <CheckBox checked={isApproved} />
          </Button>
          <Button
            onClickFn={handleMarkedClick}
            className="flex items-center justify-center gap-1 whitespace-nowrap p-2.5"
          >
            <span className="text-2xl font-semibold">Marked only</span>
            <CheckBox checked={isMarked} />
          </Button>

          <Button
            onClickFn={handleBtnGetDuplicatesClick}
            className="flex items-center justify-center gap-1 whitespace-nowrap px-2.5"
          >
            <span className="text-2xl font-semibold">Get Duplicates</span>
            <HiDocumentDuplicate size={22} color="white" />
          </Button>
        </div>
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
