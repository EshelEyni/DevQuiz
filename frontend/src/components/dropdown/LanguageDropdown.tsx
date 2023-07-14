import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ProgrammingLanguage, systemSettings } from "../../../../shared/types/system";
import { AppDispatch } from "../../store/types";
import { setLanguage } from "../../store/actions/system.actions";

export default function LanguageDropdown() {
  const dispatch: AppDispatch = useDispatch();
  const { systemSettings } = useSelector((state: RootState) => state.systemModule);
  const { programmingLanguages } = systemSettings as systemSettings;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const lang = e.target.value as ProgrammingLanguage;
    dispatch(setLanguage(lang));
  }

  return (
    <div className="select-container">
      <div className="select-wrapper">
        <select className="select" onChange={handleChange}>
          {programmingLanguages.map((lang: ProgrammingLanguage) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
