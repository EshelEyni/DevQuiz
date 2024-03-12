import { FC, useEffect, useState } from "react";
import { InputNumber } from "../../components/Input/InputNumber";
import { Select } from "../../components/App/Select";
import { systemSettings } from "../../config";
import { Button } from "../../components/Btns/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import {
  fetchQuestionsFromOpenAI,
  setQuestions,
} from "../../store/slices/questionSlice";
import {
  DifficultyLevels,
  ProgrammingLanguage,
} from "../../../../shared/types/system";
import { QuestionList } from "./QuestionList";

type FormState = {
  prompt: string;
  language: ProgrammingLanguage;
  level: DifficultyLevels;
  numberOfQuestions: number;
};

export const QuestionFetcher: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isFetched, setIsFetched] = useState(false);
  const [formtState, setFormState] = useState<FormState>({
    prompt: "",
    language: "HTML",
    level: "beginner",
    numberOfQuestions: 5,
  });
  const { programmingLanguages, difficultyLevels } = systemSettings;

  function handleChangeLangSelect(language: ProgrammingLanguage) {
    setFormState({ ...formtState, language });
  }

  function handleChangeDifficultySelect(level: DifficultyLevels) {
    setFormState({ ...formtState, level });
  }

  function handleChangePrompt(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const prompt = e.target.value;
    setFormState({ ...formtState, prompt });
  }

  function handleChangeNumInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    const numberOfQuestions = val > 90 ? 90 : val;
    setFormState({ ...formtState, numberOfQuestions });
  }

  function updateQuestionNum(n: number) {
    const val = formtState.numberOfQuestions + n;
    let newSec = 0;
    if (val < 1) newSec = 1;
    else if (val > 90) newSec = 90;
    else newSec = val;
    setFormState({ ...formtState, numberOfQuestions: newSec });
  }

  function handleFetchBtnClick() {
    const { prompt, language, level, numberOfQuestions } = formtState;
    dispatch(
      fetchQuestionsFromOpenAI({
        prompt,
        language,
        level,
        numberOfQuestions: numberOfQuestions,
      }),
    );
    setIsFetched(true);
  }

  useEffect(() => {
    dispatch(setQuestions([]));
  }, [dispatch]);

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg">
      <div className="flex w-full flex-wrap items-center justify-end gap-4 border-b-2 border-gray-950 bg-gray-800 p-4 sm:!justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <textarea
            className="h-14 w-[350px] rounded-xl bg-gray-700 p-5 text-2xl leading-5 text-gray-100 outline-none"
            placeholder="Enter a prompt"
            value={formtState.prompt}
            onChange={handleChangePrompt}
          />
          <Select onChange={handleChangeLangSelect}>
            <Select.SelectTrigger
              className="h-14 w-52 cursor-pointer rounded-xl 
            bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300"
            >
              <button type="button">{formtState.language}</button>
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
              <button type="button">{formtState.level}</button>
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
          <div className="flex flex-col gap-1 p-1">
            <h2 className="text-3xl font-medium text-gray-200">
              Number of Questions
            </h2>
            <InputNumber
              handleChange={handleChangeNumInput}
              updateNumber={updateQuestionNum}
              value={formtState.numberOfQuestions}
              max={90}
              name="secondsPerQuestion"
              className="self-center"
            />
          </div>
        </div>

        <Button
          className="rounded-full bg-gray-700 px-10 py-4 text-3xl font-medium text-gray-100"
          onClickFn={handleFetchBtnClick}
        >
          Fetch
        </Button>
      </div>
      {!isFetched && (
        <h2 className="mt-4 text-center text-3xl font-bold">
          Fetch questions from OpenAI
        </h2>
      )}
      {isFetched && <QuestionList />}
    </div>
  );
};
