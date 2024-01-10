import { LanguageInfo } from "../../../../../shared/types/system";
import { Header } from "../../Gen/Header";
import { systemSettings } from "../../../config";
import { useQuiz } from "../../../hooks/useQuiz";

export const QuizHeader = () => {
  const { language } = useQuiz();
  const currLanguage = systemSettings.programmingLanguages[
    language
  ] as LanguageInfo;
  if (!currLanguage) return null;
  const { img } = currLanguage;

  return (
    <Header className="mb-16 mt-8 flex items-center justify-between">
      <img src={img} alt="logo" className="quiz-header--img h-56 w-56" />
      <h1>DevQuiz</h1>
    </Header>
  );
};
