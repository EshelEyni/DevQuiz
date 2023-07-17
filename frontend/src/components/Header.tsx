import { LanguageDropdown } from "../components/dropdown/LanguageDropdown";
import { LevelDropdown } from "../components/dropdown/LevelDropdown";
import { InputNumber } from "../components/input/InputNumber";
import { BtnContact } from "./btns/BtnContact";
import { BtnAuth } from "./btns/BtnAuth";
import { useLocation } from "react-router-dom";
import { BtnGoToHomepage } from "./btns/BtnGoToHomepage";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { BtnGoToAdminPage } from "./btns/BtnGoToAdminPage";

export const Header = () => {
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);
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
          {loggedinUser && loggedinUser.isAdmin && <BtnGoToAdminPage />}
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
