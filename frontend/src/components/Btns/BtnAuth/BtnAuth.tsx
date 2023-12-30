import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const BtnAuth = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();

  function handleLoginSignupClick() {
    if (!loggedInUser) navigate("/home/auth");
    else navigate(`/profile/${loggedInUser.id}`);
  }
  return (
    <button className="btn-app" onClick={handleLoginSignupClick}>
      {loggedInUser ? loggedInUser.username : "Login"}
    </button>
  );
};
