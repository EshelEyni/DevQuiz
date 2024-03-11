import { FC } from "react";
import { Question } from "../../../../shared/types/question";
import { AppDispatch } from "../../types/app.types";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../../store/slices/questionSlice";
import { Button } from "./Button";
import { TbSwitch3 } from "react-icons/tb";

type BtnShuffleOptionProps = {
  question: Question;
};

export const BtnShuffleOption: FC<BtnShuffleOptionProps> = ({ question }) => {
  const dispatch: AppDispatch = useDispatch();

  function shuffleCorrectOption() {
    const { options, correctOption } = question;
    const shuffledOptions = options.slice();
    const correctOptionValue = shuffledOptions[correctOption];
    shuffledOptions.splice(correctOption, 1);
    shuffledOptions.sort(() => Math.random() - 0.5);
    shuffledOptions.splice(
      Math.floor(Math.random() * (shuffledOptions.length + 1)),
      0,
      correctOptionValue,
    );

    const newCorrectOption = shuffledOptions.indexOf(correctOptionValue);
    const newQuestion = {
      ...question,
      options: shuffledOptions,
      correctOption: newCorrectOption,
    };

    dispatch(updateQuestion(newQuestion));
  }
  return (
    <Button onClickFn={shuffleCorrectOption}>
      <TbSwitch3 className="text-5xl md:text-4xl" />
    </Button>
  );
};
