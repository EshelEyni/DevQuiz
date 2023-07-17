import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AppDispatch } from "../../store/types";
import { toggleIsLoginSignupModalOpen } from "../../store/actions/modal.actions";
import { useNavigate } from "react-router-dom";

export const BtnAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);

  function handleLoginSignupClick() {
    if (!loggedinUser) dispatch(toggleIsLoginSignupModalOpen());
    else navigate(`/profile/${loggedinUser.id}`);
  }
  return (
    <button className="btn-app-header" onClick={handleLoginSignupClick}>
      {loggedinUser ? loggedinUser.username : "Login"}
    </button>
  );
};
