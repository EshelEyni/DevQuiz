import { LanguageDropdown } from "./dropdown/LanguageDropdown";
import { LevelDropdown } from "./dropdown/LevelDropdown";
import { InputNumber } from "./input/InputNumber";
import { BtnContact } from "./btns/BtnContact";
import { BtnAuth } from "./btns/BtnAuth";
import { useLocation } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Header } from "./Header";
import { BtnLink } from "./btns/BtnLink";

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
          <InputNumber />
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
