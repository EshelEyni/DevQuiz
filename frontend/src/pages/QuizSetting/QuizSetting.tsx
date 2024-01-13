import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainScreen } from "../../components/Gen/MainScreen";
import { Button } from "../../components/Btns/Button/Button";
import { useQuiz } from "../../hooks/useQuiz";
import { useDispatch } from "react-redux";
import { InputNumber } from "../../components/Input/InputNumber/InputNumber";
import { systemSettings } from "../../config";
import { ProgrammingLanguage } from "../../../../shared/types/system";
import { AppDispatch } from "../../types/app.types";
import { startNewQuiz } from "../../store/slices/quizSlice";
import { InputContainer } from "./InputContainer";
import classnames from "classnames";
import { useAuth } from "../../hooks/useAuth";
import { updateLoggedInUser } from "../../store/slices/authSlice";

export const QuizSetting = () => {
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
    const secondsPerQuestion = Number(e.target.value);
    setFormState({ ...formtState, secondsPerQuestion });
  }

  function updateSec(n: number) {
    const newSec = formtState.secondsPerQuestion + n;
    if (newSec < 0 || newSec > 90) return;
    setFormState({ ...formtState, secondsPerQuestion: newSec });
  }

  function handleChangeNumInput(e: React.ChangeEvent<HTMLInputElement>) {
    const numQuestions = Number(e.target.value);
    setFormState({ ...formtState, numQuestions });
  }

  function updateNum(n: number) {
    const newNum = formtState.numQuestions + n;
    if (newNum < 0 || newNum > 90) return;
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
        className="fixed left-1/2 top-1/2 z-[1000] flex h-full min-h-min w-full max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col items-center
    overflow-scroll bg-gray-50 px-3 pt-5 lg:h-[90vh] lg:w-[50vw] lg:rounded-xl"
      >
        <h1 className="mb-10 text-5xl font-medium text-gray-700">
          Quiz Setting
        </h1>
        <div className="flex flex-col gap-6 px-3">
          <InputContainer title="Technology">
            <div className="flex w-full flex-wrap gap-2">
              {Object.keys(programmingLanguages).map((lang: string) => (
                <Button
                  key={lang}
                  className={classnames("w-fit rounded-2xl px-5 py-4 text-xl", {
                    "bg-sky-600 text-gray-50": formtState.language === lang,
                  })}
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
                  className={classnames("w-fit rounded-2xl px-5 py-3 text-xl", {
                    "bg-sky-600 text-gray-50": formtState.level === level,
                  })}
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
        <div className="mt-6 flex items-center gap-3">
          <Button
            onClickFn={onGoBack}
            className="d-flex items-center justify-center px-6 py-3 text-xl "
          >
            <span>close</span>
          </Button>

          <Button
            onClickFn={handleSaveClick}
            className="d-flex items-center justify-center px-6 py-3 text-xl "
          >
            <span>save</span>
          </Button>
        </div>
      </main>
    </>
  );
};
