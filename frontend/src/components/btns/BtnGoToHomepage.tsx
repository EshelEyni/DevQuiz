import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export const BtnGoToHomepage = () => {
  const { language } = useSelector((state: RootState) => state.systemModule);
  const navigate = useNavigate();

  function onGoToHomepage() {
    navigate("/");
  }
  return (
    <button className={`btn-app-header ${language}`} onClick={onGoToHomepage}>
      Homepage
    </button>
  );
};
