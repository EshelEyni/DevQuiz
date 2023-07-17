import { LanguageDropdown } from "./dropdown/LanguageDropdown";
import { LevelDropdown } from "./dropdown/LevelDropdown";
import { InputNumber } from "./input/InputNumber";
import { BtnContact } from "./btns/BtnContact";
import { BtnAuth } from "./btns/BtnAuth";
import { useLocation } from "react-router-dom";
import { BtnGoToHomepage } from "./btns/BtnGoToHomepage";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { BtnGoToAdminPage } from "./btns/BtnGoToAdminPage";

export const AppHeader = () => {
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);
  const isAdmin = loggedinUser?.roles.includes("admin");

  const location = useLocation();
  const isHomepage = location.pathname === "/";
  return (
    <header className="app-header">
      {isHomepage ? (
        <div className="inputs-container">
          <LanguageDropdown />
          <LevelDropdown />
          <InputNumber />
        </div>
      ) : (
        <div className="btn-navigation-container">
          <BtnGoToHomepage />
          {loggedinUser && isAdmin && <BtnGoToAdminPage />}
        </div>
      )}
      <div className="btns-container">
        <BtnContact />
        <div className="vertical"></div>
        <BtnAuth />
      </div>
    </header>
  );
};
