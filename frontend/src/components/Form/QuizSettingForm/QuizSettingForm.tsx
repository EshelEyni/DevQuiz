import { FC } from "react";
import { LanguageDropdown } from "../../Dropdown/LanguageDropdown/LanguageDropdown";
import { LevelDropdown } from "../../Dropdown/LevelDropdown/LevelDropdown";
import { InputNumber } from "../../Input/InputNumber/InputNumber";
import { AppDispatch } from "../../../types/app.types";
import { useDispatch } from "react-redux";
import { setSecondsPerQuestion } from "../../../store/slices/quizSlice";
import { useQuiz } from "../../../hooks/useQuiz";

export const QuizSettingForm: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { secondsPerQuestion, isTimerOn } = useQuiz();

  function handleChangeSecsPerQuestion(e: React.ChangeEvent<HTMLInputElement>) {
    const secondsPerQuestion = e.target.value;
    dispatch(setSecondsPerQuestion(Number(secondsPerQuestion)));
  }

  return (
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
  );
};
