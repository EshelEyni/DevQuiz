import { useSelector } from "react-redux";
import { RootState } from "../types/app.types";

export function useUsers() {
  const {
    users,
    getUsersState,
    user,
    getUserState,
    updateUserState,
    removeUserState,
  } = useSelector((state: RootState) => state.user);

  return {
    users,
    getUsersState,
    user,
    getUserState,
    updateUserState,
    removeUserState,
  };
}
