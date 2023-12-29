import { useSelector } from "react-redux";
import { RootState } from "../types/app.types";

export function useAuth() {
  const { loggedInUser, queryState, updateQueryState } = useSelector(
    (state: RootState) => state.auth,
  );
  return { loggedInUser, queryState, updateQueryState };
}
