import LanguageDropdown from "../components/dropdown/LanguageDropdown";
import LevelDropdown from "../components/dropdown/LevelDropdown";
import InputNumber from "../components/input/InputNumber";
import BtnContact from "./btns/BtnContact";
import BtnLoginSignup from "./btns/BtnLoginSignup";

export default function Header() {
  return (
    <header className="app-header">
      <div className="inputs-container">
        <LanguageDropdown />
        <LevelDropdown />
        <InputNumber />
      </div>
      <div className="btns-container">
        <BtnContact />
        <div className="vertical"></div>
        <BtnLoginSignup />
      </div>
    </header>
  );
}
