import { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Question } from "../../../../shared/types/question";
import { useDispatch } from "react-redux";
import questionService from "../../services/question.service";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { MainScreen } from "../../components/Gen/MainScreen";
import { addQuestion, updateQuestion } from "../../store/slices/questionSlice";
import { setIsTimerOn } from "../../store/slices/quizSlice";
import { AppDispatch } from "../../types/app.types";
import { BtnCopyQuestion } from "../../components/Btns/BtnCopyQuestion";
import { Header } from "../../components/Gen/Header";
import { systemSettings } from "../../config";
import classnames from "classnames";
import { Select } from "../../components/App/Select";
import { Button } from "../../components/Btns/Button";
import { useKey } from "react-use";
import { useQuestion } from "../../hooks/useQuestion";
import { FilterBy } from "../QuestionManagement/QuestionManagementPage";
import {
  DifficultyLevels,
  ProgrammingLanguage,
} from "../../../../shared/types/system";

type QuestionEditParams = {
  isNested?: boolean;
  setFilterBy?: (filterBy: React.SetStateAction<FilterBy>) => void;
};

const QuestionEdit: FC<QuestionEditParams> = ({
  isNested = true,
  setFilterBy,
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [question, setQuestion] = useState<Question | null>(null);
  const { programmingLanguages, difficultyLevels } = systemSettings;
  const { filterBy } = useQuestion();
  const className = isNested
    ? classnames(
        "fixed left-0 top-0 z-[1000] flex h-screen w-screen flex-col overflow-scroll bg-gray-800 p-8 md:left-1/2 md:top-1/2 md:h-4/5 md:w-3/5 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl",
        {
          "justify-center": !question,
        },
      )
    : "min-h-screen bg-gray-800 p-8 flex flex-col gap-4 border border-white rounded-xl w-11/12 md:w-1/2 mt-10 mb-24";
  useKey("Escape", onGoBack);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    if (!question) return;
    const { name, value } = event.target;
    if (name === "correctOption") {
      setQuestion({ ...question, [name]: Number(value) - 1 });
      return;
    }
    if (name.startsWith("option-")) {
      const index = Number(name.split("-")[1]);
      const options = [...question.options];
      options[index] = value;
      setQuestion({ ...question, options });
      return;
    }
    setQuestion({ ...question, [name]: value });
  }

  function handleChangeLangSelect(language: ProgrammingLanguage) {
    if (!question) return;
    setQuestion({ ...question, language });
  }

  function handleChangeDifficultySelect(level: DifficultyLevels) {
    if (!question) return;
    setQuestion({ ...question, level });
  }

  function handleChangeTextArea(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!question) return;
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question) return;
    const { id } = params;
    if (id) {
      dispatch(updateQuestion(question));
      onGoBack();
    } else {
      dispatch(addQuestion(question));
      setQuestion(null);
      setFilterBy?.("search");
    }
  }

  function onGoBack() {
    navigate(-1);
    dispatch(setIsTimerOn(true));
  }

  useEffect(() => {
    async function fetchQuestion(id: string) {
      const question = await questionService.getById(id);
      if (!question) return;
      setQuestion(question);
    }

    function getDefaultQuestion(): Question {
      const level = filterBy.level === "all" ? "beginner" : filterBy.level;

      return {
        id: "",
        question: "",
        options: ["", "", "", ""],
        correctOption: 0,
        language: filterBy.language,
        level,
        points: 10,
        isArchived: false,
        isMarkedToBeRevised: false,
        isRevised: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    const { id } = params;
    if (id) fetchQuestion(id);
    else setQuestion(getDefaultQuestion());
  }, [params, filterBy.language, filterBy.level]);

  return (
    <>
      {isNested && <MainScreen onClickFn={onGoBack} darkMode={true} />}
      <div className={className}>
        {!question && <Loader />}
        {question && (
          <>
            <Header className="mb-4 flex items-center justify-between">
              <h2 className="text-5xl font-bold text-gray-100 md:text-3xl">
                Question Editor
              </h2>
              <BtnCopyQuestion question={question} />
            </Header>
            <form
              className="mt-4 flex flex-col items-center justify-center gap-2"
              onSubmit={handleSubmit}
            >
              <h3 className="self-start text-4xl font-medium md:text-3xl">
                Language:
              </h3>
              <Select onChange={handleChangeLangSelect}>
                <Select.SelectTrigger
                  className="h-14 w-52 cursor-pointer rounded-xl border-2 border-gray-800 
            bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300"
                >
                  <button type="button">{question.language}</button>
                </Select.SelectTrigger>
                <Select.SelectList
                  className="z-[1500] mt-1 w-52  min-w-[100px] cursor-pointer 
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300"
                >
                  {Object.keys(programmingLanguages).map((lang: string) => (
                    <Select.SelectItem
                      key={lang}
                      value={lang}
                      className="flex h-14 w-full min-w-[100px] cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100"
                    >
                      <span>{lang}</span>
                    </Select.SelectItem>
                  ))}
                </Select.SelectList>
              </Select>

              <h3 className="self-start text-4xl font-medium md:text-3xl">
                Question:
              </h3>
              <textarea
                name="question"
                value={question.question}
                onChange={handleChangeTextArea}
                required
                className="w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none"
              />
              <h3 className="self-start text-4xl font-medium md:text-3xl">
                Options:
              </h3>
              {question.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  name={`option-${index}`}
                  value={option}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none"
                />
              ))}

              <h3 className="self-start text-4xl font-medium md:text-3xl">
                Correct Option:
              </h3>

              <input
                type="number"
                name="correctOption"
                value={question.correctOption + 1}
                onChange={handleChange}
                min={0}
                max={question.options.length}
                required
                className="w-24 rounded-md bg-gray-700 p-4 text-center text-2xl font-medium text-gray-100 outline-none"
              />

              <h3 className="self-start text-4xl font-medium md:text-3xl">
                Level:
              </h3>

              <Select onChange={handleChangeDifficultySelect}>
                <Select.SelectTrigger
                  className="h-14 w-52 cursor-pointer rounded-xl border-2 border-gray-800 
            bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300"
                >
                  <button type="button">{question.level}</button>
                </Select.SelectTrigger>
                <Select.SelectList className="z-[1500] mt-1 w-52 min-w-[100px] cursor-pointer border-2 border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300">
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

              <h3 className="self-start text-4xl font-medium md:text-3xl">
                Points:
              </h3>

              <input
                type="number"
                name="points"
                value={question.points}
                onChange={handleChange}
                required
                className="w-24 rounded-md bg-gray-700 p-4 text-center text-2xl font-medium text-gray-100 outline-none"
              />

              <div className="item-center mt-8 flex justify-center gap-4">
                <Button
                  type="button"
                  className="h-14 w-40 rounded-xl bg-gray-700 text-2xl font-medium text-gray-100 hover:bg-gray-900"
                  onClickFn={onGoBack}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-14 w-40 rounded-xl bg-gray-700 text-2xl font-medium text-gray-100 hover:bg-gray-900"
                >
                  Save
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default QuestionEdit;
