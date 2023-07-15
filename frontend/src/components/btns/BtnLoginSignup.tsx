import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AppDispatch } from "../../store/types";
import { toggleIsLoginSignupModalOpen } from "../../store/actions/system.actions";

export default function BtnLoginSignup() {
  const dispatch: AppDispatch = useDispatch();
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);
  const { language } = useSelector((state: RootState) => state.systemModule);

  function handleLoginSignupClick() {
    if (!loggedinUser) dispatch(toggleIsLoginSignupModalOpen());
  }
  return (
    <button className={`btn-app-header ${language}`} onClick={handleLoginSignupClick}>
      {loggedinUser ? loggedinUser.username : "Login"}
    </button>
  );
}
