import { FC, useState } from "react";
import {
  ProgrammingLanguage,
  QuestionAnswerCount,
  StatsDisplayLevel,
} from "../../../../shared/types/system";
import { CircularProgressBar } from "./CircularProgressBar";
import { systemSettings } from "../../config";
import { Select } from "../../components/App/Select";
import { Modal } from "../../components/App/Modal";
import { LanguageAndLevel } from "../../types/app.types";

type StatsDisplayProps = {
  answerLanguage: ProgrammingLanguage;
  answerCount: QuestionAnswerCount;
  questionCount: QuestionAnswerCount;
  onRestart: (params: LanguageAndLevel) => void;
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
  onRestart,
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

  async function handleRestart() {
    onRestart({
      language: answerLanguage,
      level: level === "total" ? undefined : level,
    });
  }

  return (
    <div className="flex min-h-[26rem] w-64 flex-col items-center overflow-hidden rounded-md bg-gray-600 pt-4 sm:w-72">
      <CircularProgressBar percentage={percentage} themeColor={themeColor} />
      <h3 className="my-auto text-4xl font-medium md:text-3xl">
        {answerCount[level]}/{questionCount[level]}
      </h3>
      <Modal>
        <Modal.OpenBtn
          modalName="restart"
          className="my-auto flex h-12 w-44 
          cursor-pointer items-center justify-center rounded-xl border border-gray-800 bg-gray-700 text-2xl font-semibold capitalize leading-5 text-gray-100 outline-none transition-all duration-300"
        >
          <span>restart</span>
        </Modal.OpenBtn>
        <Modal.Window
          name="restart"
          className="fixed left-1/2 top-1/2 z-[500] flex max-w-[320px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-lg bg-gray-600 p-8 text-gray-100 shadow-xl"
        >
          <p className="text-2xl font-semibold">
            Are you sure you want to restart?
          </p>
          <p className="text-md mt-4 max-w-[200px] font-medium">
            This will reset all your progress, and bring you questions you have
            already answered.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Modal.CloseBtn className="rounded-full bg-gray-800 px-5 py-3 text-lg font-medium uppercase">
              <button>cancel</button>
            </Modal.CloseBtn>
            <Modal.CloseBtn
              className="rounded-full bg-gray-800 px-5 py-3 text-lg font-medium uppercase"
              onClickFn={handleRestart}
            >
              <button>restart</button>
            </Modal.CloseBtn>
          </div>
        </Modal.Window>
      </Modal>

      <Select onChange={handleChangeLevelSelect}>
        <Select.SelectTrigger
          className="my-auto h-12 w-44 cursor-pointer rounded-xl 
            border border-gray-800 bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300"
        >
          <button type="button">{level}</button>
        </Select.SelectTrigger>
        <Select.SelectList
          className="z-[1500] mt-1 w-44  min-w-[100px] cursor-pointer 
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300"
        >
          {Object.keys(answerCount).map((lang: string) => (
            <Select.SelectItem
              key={lang}
              value={lang}
              className="flex h-12 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl
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
