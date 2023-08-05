import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { LanguageDropdown } from "../../Dropdown/LanguageDropdown/LanguageDropdown";
import { LevelDropdown } from "../../Dropdown/LevelDropdown/LevelDropdown";
import { InputNumber } from "../../Input/InputNumber/InputNumber";
import { BtnContact } from "../../Btns/BtContact/BtnContact";
import { BtnAuth } from "../../Btns/BtnAuth/BtnAuth";
import { BtnLink } from "../../Btns/BtnLink/BtnLink";
import { Header } from "../../Gen/Header";
import "./AppHeader.scss";
import { setSecondsPerQuestion } from "../../../store/actions/system.actions";
import { AppDispatch } from "../../../store/types";

export const AppHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);
  const { isTimerOn } = useSelector((state: RootState) => state.quizModule);
  const { secondsPerQuestion } = useSelector((state: RootState) => state.systemModule);
  const isQuestionEditLinkShown =
    loggedinUser && loggedinUser?.roles.some(role => role === "admin" || role === "editor");

  const isUserAdmin = loggedinUser && loggedinUser?.roles.some(role => role === "admin");

  const location = useLocation();
  const isHomepage = location.pathname === "/";

  function handleChangeSecsPerQuestion(e: React.ChangeEvent<HTMLInputElement>) {
    const secondsPerQuestion = e.target.value;
    dispatch(setSecondsPerQuestion(Number(secondsPerQuestion)));
  }

  useEffect(() => {}, [isTimerOn]);
  return (
    <Header className="app-header">
      {isHomepage ? (
        <div className="inputs-container">
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
        <div className="btn-navigation-container">
          <BtnLink path="/" title="Homepage" />
          <div className="vertical" />
          {isQuestionEditLinkShown && (
            <BtnLink path="/question-management" title="question editor" />
          )}
          <div className="vertical" />
          {isUserAdmin && <BtnLink path="/user-management" title="user mamagement" />}
          <div className="vertical" />
          {isUserAdmin && <BtnLink path="/contact-management" title="contact mamagement" />}
        </div>
      )}
      <div className="btns-container">
        <BtnLink path="/about" title="About" />
        <div className="vertical" />
        <BtnContact />
        <div className="vertical" />
        <BtnAuth />
      </div>
    </Header>
  );
};
