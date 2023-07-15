import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AppDispatch } from "../../store/types";
import { toggleIsLoginSignupModalOpen } from "../../store/actions/system.actions";
import { useNavigate } from "react-router-dom";

export default function BtnAuth() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);
  const { language } = useSelector((state: RootState) => state.systemModule);

  function handleLoginSignupClick() {
    if (!loggedinUser) dispatch(toggleIsLoginSignupModalOpen());
    else navigate(`/profile/${loggedinUser.id}`);
  }
  return (
    <button className={`btn-app-header ${language}`} onClick={handleLoginSignupClick}>
      {loggedinUser ? loggedinUser.username : "Login"}
    </button>
  );
}
