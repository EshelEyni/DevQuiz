import { FaRegCopy } from "react-icons/fa";
import { Question } from "../../../../../shared/types/question";
import { copyToClipboard } from "../../../services/utils.service";

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
    <button onClick={onCopyQuestion}>
      <FaRegCopy size={size} color={color} />
    </button>
  );
};
