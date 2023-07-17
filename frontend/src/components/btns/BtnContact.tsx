import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { toggleIsContactModalOpen } from "../../store/actions/modal.actions";

export const BtnContact = () => {
  const dispatch: AppDispatch = useDispatch();
  function handleBtnContactClick() {
    dispatch(toggleIsContactModalOpen());
  }
  return (
    <button className="btn-app-header" onClick={handleBtnContactClick}>
      Contact Us
    </button>
  );
};
