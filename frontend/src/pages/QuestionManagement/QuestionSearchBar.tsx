import { useDispatch } from "react-redux";
import {
  getDuplicatedQuestions,
  setFilterBy,
} from "../../store/slices/questionSlice";
import { useKey } from "react-use";
import { AppDispatch } from "../../types/app.types";
import { Select } from "../../components/App/Select";
import { systemSettings } from "../../config";
import {
  ApprovedMarkedValues,
  LevelOrAll,
  ProgrammingLanguage,
} from "../../../../shared/types/system";
import { Button } from "../../components/Btns/Button";
import { TfiFiles } from "react-icons/tfi";

import { useQuestion } from "../../hooks/useQuestion";
import { updateLoggedInUser } from "../../store/slices/authSlice";
import { useAuth } from "../../hooks/useAuth";

export const QuestionSearchBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loggedInUser } = useAuth();

  const { programmingLanguages, difficultyLevels } = systemSettings;

  const { filterBy } = useQuestion();

  const { language, level, searchTerm, approved, marked } = filterBy;
  const approvedValues: ApprovedMarkedValues[] = [
    { name: "Approved only", value: true },
    { name: "Remove approved", value: false },
    { name: "All", value: undefined },
  ];

  const MarkedValues: ApprovedMarkedValues[] = [
    { name: "Marked only", value: true },
    { name: "Remove marked", value: false },
    { name: "All", value: undefined },
  ];

  useKey("Enter", onSearch, {}, [filterBy, loggedInUser]);

  function handleChangeLangSelect(language: ProgrammingLanguage) {
    dispatch(setFilterBy({ ...filterBy, language }));
  }

  function handleChangeDifficultySelect(level: LevelOrAll) {
    dispatch(setFilterBy({ ...filterBy, level }));
  }

  function handleInputSearchTermChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const searchTerm = event.target.value;
    dispatch(setFilterBy({ ...filterBy, searchTerm }));
  }

  function handleChangeApprovedSelect(approved: ApprovedMarkedValues) {
    dispatch(setFilterBy({ ...filterBy, approved }));
  }

  function handleChangeMarkedSelect(marked: ApprovedMarkedValues) {
    dispatch(setFilterBy({ ...filterBy, marked }));
  }

  function onSearch() {
    if (!loggedInUser) return;
    dispatch(updateLoggedInUser({ ...loggedInUser, searchSettings: filterBy }));
  }

  function handleBtnGetDuplicatesClick() {
    dispatch(getDuplicatedQuestions({ language }));
  }

  return (
    <div className="min-h-32 flex w-full flex-col items-center justify-between border-b border-gray-300 bg-gray-800 px-4 py-4 md:flex-row md:px-20">
      <div className="flex flex-col gap-3">
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
          <Select onChange={handleChangeApprovedSelect}>
            <Select.SelectTrigger
              className="h-14 w-56 cursor-pointer rounded-xl 
            bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300"
            >
              <button type="button">{approved.name}</button>
            </Select.SelectTrigger>
            <Select.SelectList
              className="z-[1500] mt-1 w-56  min-w-[100px] cursor-pointer 
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300"
            >
              {approvedValues.map(({ name, value }) => (
                <Select.SelectItem
                  key={name}
                  value={{ name, value }}
                  className="flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100"
                >
                  <span className="capitalize">{name}</span>
                </Select.SelectItem>
              ))}
            </Select.SelectList>
          </Select>

          <Select onChange={handleChangeMarkedSelect}>
            <Select.SelectTrigger
              className="h-14 w-56 cursor-pointer rounded-xl 
            bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300"
            >
              <button type="button">{marked.name}</button>
            </Select.SelectTrigger>
            <Select.SelectList
              className="z-[1500] mt-1 w-56  min-w-[100px] cursor-pointer 
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300"
            >
              {MarkedValues.map(({ name, value }) => (
                <Select.SelectItem
                  key={name}
                  value={{ name, value }}
                  className="flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100"
                >
                  <span className="capitalize">{name}</span>
                </Select.SelectItem>
              ))}
            </Select.SelectList>
          </Select>

          <Button
            onClickFn={handleBtnGetDuplicatesClick}
            className="flex items-center justify-center gap-3 whitespace-nowrap px-2.5"
          >
            <span className="text-2xl font-semibold">Get Duplicates</span>
            <TfiFiles size={20} color="white" />
          </Button>
        </div>
      </div>

      <Button
        onClickFn={onSearch}
        className="flex h-14 transform items-center justify-center self-end rounded-full bg-gray-700 p-10 text-2xl leading-5 text-gray-100 transition-all duration-300 hover:scale-110 md:self-center"
      >
        <span className="text-3xl capitalize">search</span>
      </Button>
    </div>
  );
};
