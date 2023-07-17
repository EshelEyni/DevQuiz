import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { LanguageInfo } from "../../../shared/types/system";

export const QuizHeader = () => {
  const { language } = useSelector((state: RootState) => state.systemModule);
  const { systemSettings } = useSelector((state: RootState) => state.systemModule);
  const currLanguage = systemSettings.programmingLanguages[language] as LanguageInfo;
  if (!currLanguage) return null;
  const { img } = currLanguage;

  return (
    <header className="quiz-header">
      <img src={img} alt="logo" />
      <h1>The Fullstack Quiz</h1>
    </header>
  );
};
