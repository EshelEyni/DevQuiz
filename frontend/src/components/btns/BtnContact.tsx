import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AppDispatch } from "../../store/types";
import { toggleIsContactModalOpen } from "../../store/actions/modal.actions";

export default function BtnContact() {
  const dispatch: AppDispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.systemModule);
  function handleBtnContactClick() {
    dispatch(toggleIsContactModalOpen());
  }
  return (
    <button className={`btn-app-header ${language}`} onClick={handleBtnContactClick}>
      Contact Us
    </button>
  );
}
