import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { LanguageDropdown } from "../../Dropdown/LanguageDropdown/LanguageDropdown";
import { LevelDropdown } from "../../Dropdown/LevelDropdown/LevelDropdown";
import { InputNumber } from "../../Input/InputNumber/InputNumber";
import { BtnAuth } from "../../Btns/BtnAuth/BtnAuth";
import { BtnLink } from "../../Btns/BtnLink/BtnLink";
import { Header } from "../../Gen/Header";
import { setSecondsPerQuestion } from "../../../store/actions/system.actions";
import { AppDispatch } from "../../../store/types";
import { VerticalLine } from "../VerticalLine";

export const AppHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);
  const { isTimerOn } = useSelector((state: RootState) => state.quizModule);
  const { secondsPerQuestion } = useSelector(
    (state: RootState) => state.systemModule,
  );
  const isQuestionEditLinkShown =
    loggedinUser &&
    loggedinUser?.roles.some(role => role === "admin" || role === "editor");

  const isUserAdmin =
    loggedinUser && loggedinUser?.roles.some(role => role === "admin");

  const location = useLocation();
  const isHomepage = location.pathname === "/";

  function handleChangeSecsPerQuestion(e: React.ChangeEvent<HTMLInputElement>) {
    const secondsPerQuestion = e.target.value;
    dispatch(setSecondsPerQuestion(Number(secondsPerQuestion)));
  }

  useEffect(() => {}, [isTimerOn]);
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
          <VerticalLine height="12" />
          {isQuestionEditLinkShown && (
            <BtnLink path="/question-management" title="question editor" />
          )}
          <VerticalLine height="12" />
          {isUserAdmin && (
            <BtnLink path="/user-management" title="user mamagement" />
          )}
          <VerticalLine height="12" />
          {isUserAdmin && (
            <BtnLink path="/contact-management" title="contact mamagement" />
          )}
        </div>
      )}
      <div className="flex items-center gap-2">
        <BtnLink path="/about" title="About" />
        <VerticalLine height="12" />
        <BtnAuth />
      </div>
    </Header>
  );
};
