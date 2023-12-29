import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const BtnAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();

  function handleLoginSignupClick() {
    // if (!loggedInUser) dispatch(toggleIsLoginSignupModalOpen());
    // else navigate(`/profile/${loggedInUser.id}`);
  }
  return (
    <button className="btn-app" onClick={handleLoginSignupClick}>
      {loggedInUser ? loggedInUser.username : "Login"}
    </button>
  );
};
