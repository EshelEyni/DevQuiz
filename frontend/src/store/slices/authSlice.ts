/* eslint-disable no-console */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasicUser, User } from "../../../../shared/types/user";
import authService from "../../services/auth.service";
import { AppThunk, QueryState, UserOrNull } from "../../types/app.types";
import {
  defaultQueryState,
  getErrorMessage,
  QUERY_TIMEOUT,
} from "../../services/utils.service";
import { ThunkDispatch } from "redux-thunk";
import toast from "react-hot-toast";
import { setFilterBy } from "./questionSlice";
import { startNewQuiz } from "./quizSlice";

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
      const error = getErrorMessage(err);
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

      setSearchSettingAndQuizByUser({ user, dispatch });
      dispatch(setQueryState({ state: "succeeded", error: null }));
    } catch (err) {
      const error = getErrorMessage(err);
      dispatch(setQueryState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setQueryState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

export function loginWithToken(): AppThunk {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.auth.loggedInUser !== null) return;

    try {
      dispatch(setQueryState({ state: "loading", error: null }));
      const user = await authService.loginWithToken();
      if (user) {
        dispatch(setLoggedInUser(user));
        setSearchSettingAndQuizByUser({ user, dispatch });
      }

      dispatch(setQueryState({ state: "succeeded", error: null }));
    } finally {
      setTimeout(() => {
        dispatch(setQueryState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

export function changePassword({
  resetToken,
  password,
  passwordConfirm,
}: {
  resetToken: string;
  password: string;
  passwordConfirm: string;
}): AppThunk {
  return async dispatch => {
    try {
      dispatch(setQueryState({ state: "loading", error: null }));
      await authService.changePassword({
        resetToken,
        password,
        passwordConfirm,
      });
      dispatch(setQueryState({ state: "succeeded", error: null }));
      toast.success("Password changed successfully");
    } catch (err) {
      const error = getErrorMessage(err);
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
      const error = getErrorMessage(err);

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
      const updatedUser = await authService.update(user);
      dispatch(setLoggedInUser(updatedUser));
      dispatch(setUpdateQueryState({ state: "succeeded", error: null }));
    } catch (err) {
      console.log("err in updateLoggedInUser", err);
      const error = getErrorMessage(err);
      dispatch(setUpdateQueryState({ state: "failed", error }));
    } finally {
      setTimeout(() => {
        dispatch(setUpdateQueryState(defaultQueryState));
      }, QUERY_TIMEOUT);
    }
  };
}

function setSearchSettingAndQuizByUser({
  user,
  dispatch,
}: {
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<unknown, unknown, any>;
}): void {
  setSearchSettingByUser({ user, dispatch });
  setQuizByUser({ user, dispatch });
}

function setSearchSettingByUser({
  user,
  dispatch,
}: {
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<unknown, unknown, any>;
}): void {
  if (!user.searchSettings) return;
  dispatch(setFilterBy(user.searchSettings));
}

function setQuizByUser({
  user,
  dispatch,
}: {
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<unknown, unknown, any>;
}): void {
  if (!user.quizSettings) return;

  const { language, level, numQuestions, secondsPerQuestion } =
    user.quizSettings;
  dispatch(
    startNewQuiz({
      language,
      level,
      limit: numQuestions,
      secondsPerQuestion,
    }),
  );
}
