import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUsers } from "../../hooks/useUser";
import { getUsers } from "../../store/slices/userSlice";
import { AppDispatch } from "../../types/app.types";

export const UserManagementPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, getUsersState } = useUsers();

  const isLoading = getUsersState.state === "loading";
  const noUsersFound = !isLoading && users.length === 0;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <main className="management-page">
      <h1>not implemented yet</h1>
    </main>
  );
};
