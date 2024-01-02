import { useNavigate } from "react-router-dom";
import { MainScreen } from "../../components/Gen/MainScreen";
import { Button } from "../../components/Btns/Button/Button";
import { setSecondsPerQuestion } from "../../store/slices/quizSlice";
import { useQuiz } from "../../hooks/useQuiz";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { LanguageDropdown } from "../../components/Dropdown/LanguageDropdown/LanguageDropdown";
import { LevelDropdown } from "../../components/Dropdown/LevelDropdown/LevelDropdown";
import { InputNumber } from "../../components/Input/InputNumber/InputNumber";

export const QuizSetting = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { secondsPerQuestion, isTimerOn } = useQuiz();

  function handleChangeSecsPerQuestion(e: React.ChangeEvent<HTMLInputElement>) {
    const secondsPerQuestion = e.target.value;
    dispatch(setSecondsPerQuestion(Number(secondsPerQuestion)));
  }

  function onGoBack() {
    navigate(-1);
  }

  return (
    <>
      <MainScreen onClickFn={onGoBack} darkMode={true} />

      <main
        className="fixed left-1/2 top-1/2 z-[1000] flex h-full min-h-min w-full max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col items-center
 gap-28 rounded-xl bg-indigo-50 py-16 lg:h-[75vh] lg:w-[50vw]"
      >
        <h1 className="text-9xl font-medium text-indigo-700">Quiz Setting</h1>
        <div className="flex w-3/5 gap-10">
          <LanguageDropdown />
          <LevelDropdown />
          {!isTimerOn && (
            <InputNumber
              handleChange={handleChangeSecsPerQuestion}
              value={secondsPerQuestion}
              max={90}
              name="secondsPerQuestion"
            />
          )}
        </div>
        <Button
          onClickFn={onGoBack}
          className="d-flex absolute bottom-10  left-1/2 -translate-x-1/2 transform items-center justify-center "
        >
          <span>close</span>
        </Button>
      </main>
    </>
  );
};
