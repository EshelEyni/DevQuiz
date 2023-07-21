import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store";
import userService from "../../services/user.service";
import { User } from "../../../../shared/types/user";

export const actionTypes = {
  SET_USERS: "SET_USERS",
  SET_USER: "SET_USER",
  REMOVE_USER: "REMOVE_USER",
  SET_IS_LOADING: "SET_IS_LOADING",
};

const { SET_USERS, SET_USER, REMOVE_USER, SET_IS_LOADING } = actionTypes;

export function getUsers(): ThunkAction<Promise<void>, RootState, undefined, AnyAction> {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_LOADING, isLoading: true });
      const users = await userService.query();
      dispatch({ type: SET_USERS, users });
      dispatch({ type: SET_IS_LOADING, isLoading: false });
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
      dispatch({ type: SET_IS_LOADING, isLoading: true });
      const user = await userService.getById(userId);
      dispatch({ type: SET_USER, user });
      dispatch({ type: SET_IS_LOADING, isLoading: false });
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
      dispatch({ type: REMOVE_USER, userId });
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
      dispatch({ type: SET_USER, user: updatedUser });
    } catch (err) {
      console.log("UserActions: err in updateUser", err);
    }
  };
}
