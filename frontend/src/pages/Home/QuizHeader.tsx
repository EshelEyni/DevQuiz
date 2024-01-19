import { LanguageInfo } from "../../../../shared/types/system";
import { Header } from "../../components/Gen/Header";
import { systemSettings } from "../../config";
import { useQuiz } from "../../hooks/useQuiz";

export const QuizHeader = () => {
  const { language } = useQuiz();
  const currLanguage = systemSettings.programmingLanguages[
    language
  ] as LanguageInfo;
  if (!currLanguage) return null;
  const { img } = currLanguage;

  return (
    <Header className="mb-12 mt-6 flex w-full items-center justify-center gap-5 px-10">
      <h1 className="text-6xl font-bold text-gray-50">DevQuiz</h1>
      <img src={img} alt="logo" className="h-20 w-20 object-contain" />
    </Header>
  );
};
