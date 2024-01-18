import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUsers } from "../../hooks/useUser";
import { getUser } from "../../store/slices/userSlice";
import { Button } from "../../components/Btns/Button/Button";
import { AppDispatch } from "../../types/app.types";
import { logout } from "../../store/slices/authSlice";

export const ProfileDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useUsers();

  useEffect(() => {
    const id = params.id;
    if (id) dispatch(getUser(id));
  }, [params, dispatch]);

  function handleLogoutClick() {
    dispatch(logout());
    navigate("/home");
  }

  return (
    <main>
      <h1>ProfileDetails</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Button onClickFn={handleLogoutClick} className="p-5 text-xl">
        logout
      </Button>
    </main>
  );
};
