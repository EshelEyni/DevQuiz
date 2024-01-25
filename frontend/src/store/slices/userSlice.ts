/* eslint-disable no-console */
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../../shared/types/user";
import { AppThunk, QueryState } from "../../types/app.types";
import {
  QUERY_TIMEOUT,
  defaultQueryState,
  getErrorMessage,
} from "../../services/utils.service";
import userService from "../../services/user.service";

type UserState = {
  users: User[];
  getUsersState: QueryState;
  user: User | null;
  getUserState: QueryState;
  updateUserState: QueryState;
  removeUserState: QueryState;
};
const initialState: UserState = {
  users: [],
  getUsersState: defaultQueryState,
  user: null,
  getUserState: defaultQueryState,
  updateUserState: defaultQueryState,
  removeUserState: defaultQueryState,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setGetUsersState(state, action) {
      state.getUsersState = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setGetUserState(state, action) {
      state.getUserState = action.payload;
    },
    addUserToState(state, action) {
      state.users.push(action.payload);
    },
    updateUserInState(state, action) {
      state.users = state.users.map(user =>
        user.id === action.payload.id ? action.payload : user,
      );
    },
    setUpdateUserState(state, action) {
      state.updateUserState = action.payload;
    },
    removeUserFromState(state, action) {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setRemoveUserState(state, action) {
      state.removeUserState = action.payload;
    },
  },
});

export const {
  setUsers,
  setGetUsersState,
  setUser,
  setGetUserState,
  addUserToState,
  updateUserInState,
  setUpdateUserState,
  removeUserFromState,
  setRemoveUserState,
} = userSlice.actions;

export default userSlice.reducer;

export function getUsers(): AppThunk {
  return async dispatch => {
    try {
      dispatch(setGetUsersState({ state: "loading", error: null }));
      const users = await userService.query();
      dispatch(setUsers(users));
      dispatch(setGetUsersState({ state: "succeeded", error: null }));
    } catch (err) {
      const error = getErrorMessage(err);
      dispatch(setGetUsersState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setGetUsersState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

export function getUser(userId: string): AppThunk {
  return async dispatch => {
    try {
      dispatch(setGetUserState({ state: "loading", error: null }));
      const user = await userService.getById(userId);
      dispatch(setUser(user));
      dispatch(setGetUserState({ state: "succeeded", error: null }));
    } catch (err) {
      const error = getErrorMessage(err);
      dispatch(setGetUserState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setGetUserState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

export function updateUser(user: User): AppThunk {
  return async dispatch => {
    try {
      dispatch(setUpdateUserState({ state: "loading", error: null }));
      const updatedUser = await userService.update(user);
      dispatch(updateUserInState(updatedUser));
      dispatch(setUpdateUserState({ state: "succeeded", error: null }));
    } catch (err) {
      const error = getErrorMessage(err);
      dispatch(setUpdateUserState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setUpdateUserState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}
