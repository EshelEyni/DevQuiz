import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store";
import  userService  from "../../services/user.service";
import { User } from "../../../../shared/types/user";

export function getUsers(): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      const users = await userService.query();
      dispatch({ type: "SET_USERS", users });
    } catch (err) {
      console.log("UserActions: err in getUsers", err);
    }
  };
}

export function getUser(
  userId: string
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      const user = await userService.getById(userId);
      dispatch({ type: "SET_USER", user });
    } catch (err) {
      console.log("UserActions: err in getUser", err);
    }
  };
}

export function removeUser(
  userId: string
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      await userService.remove(userId);
      dispatch({ type: "REMOVE_USER", userId });
    } catch (err) {
      console.log("UserActions: err in removeUser", err);
    }
  };
}

export function updateUser(
  user: User
): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      const updatedUser = await userService.update(user);
      dispatch({ type: "SET_USER", user: updatedUser });
    } catch (err) {
      console.log("UserActions: err in updateUser", err);
    }
  };
}
