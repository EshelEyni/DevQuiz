import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { LanguageDropdown } from "../../Dropdown/LanguageDropdown/LanguageDropdown";
import { LevelDropdown } from "../../Dropdown/LevelDropdown/LevelDropdown";
import { SecsPerQuestionInput } from "../../Input/SecsPerQuestionInput/SecsPerQuestionInput";
import { BtnContact } from "../../Btns/BtContact/BtnContact";
import { BtnAuth } from "../../Btns/BtnAuth/BtnAuth";
import { BtnLink } from "../../Btns/BtnLink/BtnLink";
import { Header } from "../../Gen/Header";
import "./AppHeader.scss";

export const AppHeader = () => {
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);
  const { isTimerOn } = useSelector((state: RootState) => state.quizModule);
  const isQuestionEditLinkShown =
    loggedinUser && loggedinUser?.roles.some(role => role === "admin" || role === "editor");

  const isUserAdmin = loggedinUser && loggedinUser?.roles.some(role => role === "admin");

  const location = useLocation();
  const isHomepage = location.pathname === "/";

  useEffect(() => {}, [isTimerOn]);
  return (
    <Header className="app-header">
      {isHomepage ? (
        <div className="inputs-container">
          <LanguageDropdown />
          <LevelDropdown />
          {!isTimerOn && <SecsPerQuestionInput />}
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
