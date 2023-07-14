import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getCurrentLogo } from "../services/image.service";

function QuizHeader() {
  const { language } = useSelector((state: RootState) => state.systemModule);
  const imagePath = getCurrentLogo(language);

  return (
    <header className="quiz-header">
      <img src={imagePath} alt="logo" />
      <h1>The Fullstack Quiz</h1>
    </header>
  );
}

export default QuizHeader;
