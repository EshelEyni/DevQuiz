import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainScreen } from "../../components/Gen/MainScreen";
import { Button } from "../../components/Btns/Button";
import { useQuiz } from "../../hooks/useQuiz";
import { useDispatch } from "react-redux";
import { InputNumber } from "../../components/Input/InputNumber";
import { systemSettings } from "../../config";
import { ProgrammingLanguage } from "../../../../shared/types/system";
import { AppDispatch } from "../../types/app.types";
import { startNewQuiz } from "../../store/slices/quizSlice";
import { InputContainer } from "./InputContainer";
import classnames from "classnames";
import { useAuth } from "../../hooks/useAuth";
import { updateLoggedInUser } from "../../store/slices/authSlice";

const QuizSetting = () => {
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { programmingLanguages, difficultyLevels } = systemSettings;
  const { language, level, secondsPerQuestion, numQuestions } = useQuiz();
  const [formtState, setFormState] = useState({
    language,
    level,
    secondsPerQuestion,
    numQuestions,
  });

  function handleLangChange(language: ProgrammingLanguage) {
    setFormState({ ...formtState, language });
  }

  function handleChangeSecInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    const secondsPerQuestion = val > 90 ? 90 : val;
    setFormState({ ...formtState, secondsPerQuestion });
  }

  function updateSec(n: number) {
    const val = formtState.secondsPerQuestion + n;
    let newSec = 0;
    if (val < 0) newSec = 0;
    else if (val > 90) newSec = 90;
    else newSec = val;
    setFormState({ ...formtState, secondsPerQuestion: newSec });
  }

  function handleChangeNumInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    const numQuestions = val > 100 ? 100 : val;
    setFormState({ ...formtState, numQuestions });
  }

  function updateNum(n: number) {
    const val = formtState.numQuestions + n;
    let newNum = 0;
    if (val < 0) newNum = 0;
    else if (val > 100) newNum = 100;
    else newNum = val;
    setFormState({ ...formtState, numQuestions: newNum });
  }

  function onGoBack() {
    navigate("/home");
  }

  function handleSaveClick() {
    const { language, level, secondsPerQuestion, numQuestions } = formtState;

    dispatch(
      startNewQuiz({
        language,
        level,
        limit: numQuestions,
        secondsPerQuestion,
      }),
    );
    const quizSettings = { language, level, secondsPerQuestion, numQuestions };
    if (loggedInUser)
      dispatch(updateLoggedInUser({ ...loggedInUser, quizSettings }));
    navigate("/home");
  }

  return (
    <>
      <MainScreen onClickFn={onGoBack} darkMode={true} />

      <main
        className="fixed left-1/2 top-1/2 z-[1000] flex h-full min-h-min w-full max-w-[1200px] flex-1 -translate-x-1/2 -translate-y-1/2 flex-col
    items-center overflow-scroll bg-gray-50 px-3 pt-5 lg:h-[90vh] lg:w-[50vw] lg:rounded-xl"
      >
        <h1 className="mb-10 text-8xl font-medium tracking-wide text-gray-700 md:text-7xl">
          Quiz Setting
        </h1>
        <div className="flex flex-1 flex-col gap-12 px-3">
          <InputContainer title="Technology">
            <div className="flex w-full flex-wrap gap-2">
              {Object.keys(programmingLanguages).map((lang: string) => (
                <Button
                  key={lang}
                  className={classnames(
                    "w-fit rounded-2xl bg-gray-700 px-8 py-7 text-4xl font-medium md:px-5 md:py-4 md:text-3xl",
                    {
                      "bg-sky-600 text-gray-50": formtState.language === lang,
                    },
                  )}
                  onClickFn={() =>
                    handleLangChange(lang as ProgrammingLanguage)
                  }
                >
                  <span>{lang}</span>
                </Button>
              ))}
            </div>
          </InputContainer>

          <InputContainer title="Level">
            <div className="flex w-full flex-wrap gap-2">
              {difficultyLevels.map(level => (
                <Button
                  key={level}
                  className={classnames(
                    "w-fit rounded-2xl bg-gray-700 px-8 py-7 text-4xl font-medium capitalize md:px-5 md:py-4 md:text-3xl",
                    {
                      "bg-sky-600 text-gray-50": formtState.level === level,
                    },
                  )}
                  onClickFn={() => setFormState({ ...formtState, level })}
                >
                  <span>{level}</span>
                </Button>
              ))}
            </div>
          </InputContainer>

          <InputContainer title="Seconds per question">
            <InputNumber
              handleChange={handleChangeSecInput}
              updateNumber={updateSec}
              value={formtState.secondsPerQuestion}
              max={90}
              name="secondsPerQuestion"
              className="self-center"
            />
          </InputContainer>

          <InputContainer title="Number of questions">
            <InputNumber
              handleChange={handleChangeNumInput}
              updateNumber={updateNum}
              value={formtState.numQuestions}
              max={100}
              name="numQuestions"
              className="self-center"
            />
          </InputContainer>
        </div>
        <div className="my-16 flex items-center gap-3">
          <Button
            onClickFn={onGoBack}
            className="d-flex items-center justify-center rounded-full bg-gray-700 px-12 py-8 text-4xl font-medium uppercase md:px-8 md:py-6 md:text-3xl"
          >
            <span>close</span>
          </Button>

          <Button
            onClickFn={handleSaveClick}
            className="d-flex items-center justify-center rounded-full bg-gray-700 px-12 py-8 text-4xl font-medium uppercase md:px-8 md:py-6 md:text-3xl"
          >
            <span>save</span>
          </Button>
        </div>
      </main>
    </>
  );
};

export default QuizSetting;
