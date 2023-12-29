import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LanguageDropdown } from "../../Dropdown/LanguageDropdown/LanguageDropdown";
import { LevelDropdown } from "../../Dropdown/LevelDropdown/LevelDropdown";
import { InputNumber } from "../../Input/InputNumber/InputNumber";
import { BtnAuth } from "../../Btns/BtnAuth/BtnAuth";
import { BtnLink } from "../../Btns/BtnLink/BtnLink";
import { Header } from "../../Gen/Header";
import { AppDispatch } from "../../../store/types";
import { useAuth } from "../../../hooks/useAuth";
import { useQuiz } from "../../../hooks/useQuiz";
import { setSecondsPerQuestion } from "../../../store/slices/quizSlice";

export const AppHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loggedInUser } = useAuth();
  const { secondsPerQuestion, isTimerOn } = useQuiz();
  const isQuestionEditLinkShown =
    loggedInUser &&
    loggedInUser?.roles.some(role => role === "admin" || role === "editor");

  const isUserAdmin =
    loggedInUser && loggedInUser?.roles.some(role => role === "admin");

  const location = useLocation();
  const isHomepage = location.pathname === "/";

  function handleChangeSecsPerQuestion(e: React.ChangeEvent<HTMLInputElement>) {
    const secondsPerQuestion = e.target.value;
    dispatch(setSecondsPerQuestion(Number(secondsPerQuestion)));
  }

  return (
    <Header className="flex w-full items-center justify-between bg-indigo-800 px-8 py-6">
      {isHomepage ? (
        <div className="flex w-3/5 items-start justify-between">
          <LanguageDropdown />
          <LevelDropdown />
          {!isTimerOn && (
            <InputNumber
              handleChange={handleChangeSecsPerQuestion}
              value={secondsPerQuestion}
              max={90}
              name="secondsPerQuestion"
            />
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <BtnLink path="/" title="Homepage" />
          {isQuestionEditLinkShown && (
            <BtnLink path="/question-management" title="question editor" />
          )}
          {isUserAdmin && (
            <BtnLink path="/user-management" title="user mamagement" />
          )}
        </div>
      )}
      <div className="flex items-center gap-2">
        <BtnLink path="/about" title="About" />
        <BtnAuth />
      </div>
    </Header>
  );
};
