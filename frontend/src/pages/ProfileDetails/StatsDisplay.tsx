import { FC, useState } from "react";
import {
  ProgrammingLanguage,
  QuestionAnswerCount,
  StatsDisplayLevel,
} from "../../../../shared/types/system";
import { CircularProgressBar } from "./CircularProgressBar";
import { systemSettings } from "../../config";
import { Select } from "../../components/App/Select";

type StatsDisplayProps = {
  answerLanguage: ProgrammingLanguage;
  answerCount: QuestionAnswerCount;
  questionCount: QuestionAnswerCount;
};

type CalcPercParams = {
  answerCount: number;
  questionCount: number;
};

function calcPerc({ answerCount, questionCount }: CalcPercParams): number {
  return (answerCount / questionCount) * 100;
}

export const StatsDisplay: FC<StatsDisplayProps> = ({
  answerLanguage,
  answerCount,
  questionCount,
}) => {
  const [level, setLevel] = useState<StatsDisplayLevel>("total");
  const [percentage, setPercentage] = useState(
    calcPerc({
      answerCount: answerCount.total,
      questionCount: questionCount.total,
    }),
  );
  const { themeColor } =
    systemSettings.programmingLanguages[answerLanguage].themeColors;

  function handleChangeLevelSelect(level: StatsDisplayLevel) {
    setLevel(level);
    setPercentage(
      calcPerc({
        answerCount: answerCount[level],
        questionCount: questionCount[level],
      }),
    );
  }

  return (
    <div className="flex min-h-[25rem] w-72 flex-col items-center overflow-hidden rounded-md bg-gray-600">
      <CircularProgressBar percentage={percentage} themeColor={themeColor} />
      <h3 className="my-auto text-4xl font-medium md:text-3xl">
        {answerCount[level]}/{questionCount[level]}
      </h3>
      <Select onChange={handleChangeLevelSelect} listHeight={300}>
        <Select.SelectTrigger
          className="my-auto h-14 w-52 cursor-pointer rounded-xl 
            border-2 border-gray-800 bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300"
        >
          <button type="button">{level}</button>
        </Select.SelectTrigger>
        <Select.SelectList
          className="z-[1500] mt-1 w-full  min-w-[100px] cursor-pointer 
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300"
        >
          {Object.keys(answerCount).map((lang: string) => (
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
      <div className="mt-auto flex h-14 w-full items-center justify-center bg-gray-900">
        <span className="text-[1.8rem] font-bold tracking-wide text-gray-100">
          {answerLanguage}
        </span>
      </div>
    </div>
  );
};
