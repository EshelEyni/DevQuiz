/* eslint-disable no-console */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasicUser, User } from "../../../../shared/types/user";
import authService from "../../services/auth.service";
import userApiService from "../../services/user.service";
import { AppThunk, QueryState, UserOrNull } from "../../types/app.types";
import { defaultQueryState, QUERY_TIMEOUT } from "../../services/utils.service";

type AuthState = {
  loggedInUser: UserOrNull;
  queryState: QueryState;
  updateQueryState: QueryState;
};

const initialState: AuthState = {
  loggedInUser: null,
  queryState: defaultQueryState,
  updateQueryState: defaultQueryState,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInUser(state, action: PayloadAction<UserOrNull>) {
      state.loggedInUser = action.payload;
    },
    setQueryState(state, action: PayloadAction<QueryState>) {
      state.queryState = action.payload;
    },
    setUpdateQueryState(state, action: PayloadAction<QueryState>) {
      state.updateQueryState = action.payload;
    },
  },
});

export const { setLoggedInUser, setQueryState, setUpdateQueryState } =
  authSlice.actions;

export default authSlice.reducer;

export function signup(userCredentials: BasicUser): AppThunk {
  return async dispatch => {
    try {
      dispatch(setQueryState({ state: "loading", error: null }));
      const user = await authService.signup(userCredentials);
      dispatch(setLoggedInUser(user));
      dispatch(setQueryState({ state: "succeeded", error: null }));
    } catch (err) {
      console.log(err);
      const error = (err as unknown as Error).message;
      dispatch(setQueryState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setQueryState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

export function login(username: string, password: string): AppThunk {
  return async dispatch => {
    try {
      dispatch(setQueryState({ state: "loading", error: null }));
      const user = await authService.login(username, password);
      dispatch(setLoggedInUser(user));
      dispatch(setQueryState({ state: "succeeded", error: null }));
    } catch (err) {
      console.log("err in login", err);
      const error = (err as unknown as Error).message;
      dispatch(setQueryState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setQueryState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

export function loginWithToken(): AppThunk {
  return async dispatch => {
    try {
      dispatch(setQueryState({ state: "loading", error: null }));
      const user = await authService.loginWithToken();
      dispatch(setLoggedInUser(user));
      dispatch(setQueryState({ state: "succeeded", error: null }));
    } catch (err) {
      console.log("err in loginWithToken", err);
      const error = (err as unknown as Error).message;
      dispatch(setQueryState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setQueryState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

export function logout(): AppThunk {
  return async dispatch => {
    try {
      dispatch(setQueryState({ state: "loading", error: null }));
      await authService.logout();
      dispatch(setLoggedInUser(null));
      dispatch(setQueryState({ state: "succeeded", error: null }));
    } catch (err) {
      console.log("err in logout", err);
      const error = (err as unknown as Error).message;
      dispatch(setQueryState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setQueryState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

export function updateLoggedInUser(user: User): AppThunk {
  return async dispatch => {
    try {
      dispatch(setUpdateQueryState({ state: "loading", error: null }));
      const updatedUser = await userApiService.update(user);
      dispatch(setLoggedInUser(updatedUser));
      dispatch(setUpdateQueryState({ state: "succeeded", error: null }));
    } catch (err) {
      console.log("err in updateLoggedInUser", err);
      const error = (err as unknown as Error).message;
      dispatch(setUpdateQueryState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setUpdateQueryState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}
