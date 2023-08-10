import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { LanguageInfo } from "../../../../../shared/types/system";
import { Header } from "../../Gen/Header";

export const QuizHeader = () => {
  const { language } = useSelector((state: RootState) => state.systemModule);
  const { systemSettings } = useSelector((state: RootState) => state.systemModule);
  const currLanguage = systemSettings.programmingLanguages[language] as LanguageInfo;
  if (!currLanguage) return null;
  const { img } = currLanguage;

  return (
    <Header className="mb-16 mt-8 flex w-[62rem] items-center justify-between">
      <img src={img} alt="logo" className="h-56 w-56" />
      <h1>DevQuiz</h1>
    </Header>
  );
};
