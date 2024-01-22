import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUsers } from "../../hooks/useUser";
import { getUser } from "../../store/slices/userSlice";
import { Button } from "../../components/Btns/Button/Button";
import { AppDispatch } from "../../types/app.types";
import { logout } from "../../store/slices/authSlice";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { Header } from "../../components/Gen/Header";
import { UserStats } from "../../../../shared/types/system";
import userService from "../../services/user.service";

export const ProfileDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useUsers();
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  console.log(userStats);
  const { id } = params;
  const isCurrUser = user && user.id === id;

  async function fetchUserStats() {
    const userStats = await userService.getUserStats();
    setUserStats(userStats);
  }

  useEffect(() => {
    if (!id) return;
    dispatch(getUser(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!isCurrUser) return;
    fetchUserStats();
  }, [isCurrUser]);

  function handleLogoutClick() {
    dispatch(logout());
    navigate("/home");
  }

  return (
    <main className="flex min-h-[250px] w-screen flex-col items-center justify-center overflow-hidden">
      {!isCurrUser && <Loader />}

      {isCurrUser && (
        <div className="mt-10 flex flex-col items-center">
          <Header className="flex w-full flex-col items-center gap-4">
            <h1 className="text-4xl font-semibold tracking-wider">
              {user.username}
            </h1>

            <div className="flex items-center gap-3">
              <Button
                onClickFn={handleLogoutClick}
                className="text-md transform rounded-full bg-gray-800 p-3 font-semibold uppercase transition-all duration-300 ease-in-out hover:scale-105"
              >
                logout
              </Button>
            </div>
          </Header>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </main>
  );
};
