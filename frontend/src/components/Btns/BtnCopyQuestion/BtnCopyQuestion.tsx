import { useRef } from "react";
import { FaRegCopy } from "react-icons/fa";
import { Question } from "../../../../../shared/types/question";
import { copyToClipboard, makeId } from "../../../services/utils.service";
import { Tooltip } from "react-tooltip";

type BtnCopyQuestionProps = {
  question: Question;
  color?: string;
  size?: number;
};

export const BtnCopyQuestion = ({
  question,
  color = "#f1f3f5",
  size = 30,
}: BtnCopyQuestionProps) => {
  const btnId = useRef(makeId()).current;

  function onCopyQuestion() {
    const stringifiedQuestion = Object.entries(question!).reduce((acc, [key, value]) => {
      if (key === "question") return acc + `${key}: ${value}\n`;
      if (key === "options") {
        const options = (value as string[]).map(
          (option, index) => `Option ${index + 1}: ${option}`
        );
        return acc + options.join("\n") + "\n";
      }
      return acc;
    }, "");

    copyToClipboard(stringifiedQuestion);
  }

  return (
    <>
      <button
        data-tooltip-id={btnId}
        data-tooltip-content="Copy question to clipboard"
        data-tooltip-place="top"
        onClick={onCopyQuestion}
      >
        <FaRegCopy size={size} color={color} />
      </button>
      <Tooltip id={btnId} style={{ fontSize: "16px" }} />
    </>
  );
};
