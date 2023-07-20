import { useLocation } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { LanguageDropdown } from "../components/Dropdown/LanguageDropdown/LanguageDropdown";
import { LevelDropdown } from "../components/Dropdown/LevelDropdown/LevelDropdown";
import { SecsPerQuestionInput } from "../components/Input/SecsPerQuestionInput/SecsPerQuestionInput";
import { BtnContact } from "./Btns/BtContact/BtnContact";
import { BtnAuth } from "./Btns/BtnAuth/BtnAuth";
import { BtnLink } from "./Btns/BtnLink/BtnLink";
import { Header } from "./Header";

export const AppHeader = () => {
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);
  const isAdmin = loggedinUser?.roles.includes("admin");

  const location = useLocation();
  const isHomepage = location.pathname === "/";
  return (
    <Header className="app-header">
      {isHomepage ? (
        <div className="inputs-container">
          <LanguageDropdown />
          <LevelDropdown />
          <SecsPerQuestionInput />
        </div>
      ) : (
        <div className="btn-navigation-container">
          <BtnLink path="/" title="Homepage" />
          <div className="vertical"></div>
          {loggedinUser && isAdmin && <BtnLink path="/admin" title="admin page" />}
        </div>
      )}
      <div className="btns-container">
        <BtnLink path="/about" title="About" />
        <div className="vertical"></div>
        <BtnContact />
        <div className="vertical"></div>
        <BtnAuth />
      </div>
    </Header>
  );
};
