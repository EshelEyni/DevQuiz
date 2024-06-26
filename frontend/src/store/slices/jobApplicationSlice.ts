/* eslint-disable no-console */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AppThunk, QueryState } from "../../types/app.types";

import {
  QUERY_TIMEOUT,
  defaultQueryState,
  getErrorMessage,
} from "../../services/utils.service";

import { JobApplication } from "../../../../shared/types/application";

import { applicationService } from "../../services/application.service";

interface JobApplicationState {
  applications: JobApplication[];
  getApplicationsState: QueryState;
  application: JobApplication | null;
  getApplicationState: QueryState;
  addApplicationState: QueryState;
  updateApplicationState: QueryState;
  archiveApplicationState: QueryState;
}

const initialState: JobApplicationState = {
  applications: [],
  getApplicationsState: defaultQueryState,
  application: null,
  getApplicationState: defaultQueryState,
  addApplicationState: defaultQueryState,
  updateApplicationState: defaultQueryState,
  archiveApplicationState: defaultQueryState,
};

const jobApplicationSlice = createSlice({
  name: "jobApplication",
  initialState,
  reducers: {
    setApplications(state, action: PayloadAction<JobApplication[]>) {
      state.applications = action.payload;
    },
    setGetApplicationsState(state, action: PayloadAction<QueryState>) {
      state.getApplicationsState = action.payload;
    },
    setApplication(state, action: PayloadAction<JobApplication | null>) {
      state.application = action.payload;
    },
    setUpdateApplication(state, action: PayloadAction<JobApplication>) {
      state.application = action.payload;
      state.applications = state.applications.map(application =>
        application.id === action.payload.id ? action.payload : application,
      );
    },
    setGetApplicationState(state, action: PayloadAction<QueryState>) {
      state.getApplicationState = action.payload;
    },
    addApplicationToState(state, action: PayloadAction<JobApplication>) {
      state.applications.unshift(action.payload);
      state.application = action.payload;
    },
    setAddApplicationState(state, action: PayloadAction<QueryState>) {
      state.addApplicationState = action.payload;
    },
    setUpdateApplicationState(state, action: PayloadAction<QueryState>) {
      state.updateApplicationState = action.payload;
    },
    removeApplicationFromState(state, action: PayloadAction<string>) {
      state.applications = state.applications.filter(
        application => application.id !== action.payload,
      );
      state.application = null;
    },
    setArchiveApplicationState(state, action: PayloadAction<QueryState>) {
      state.archiveApplicationState = action.payload;
    },
  },
});

export const {
  setApplications,
  setGetApplicationsState,
  setApplication,
  setUpdateApplication,
  setGetApplicationState,
  addApplicationToState,
  setAddApplicationState,
  setUpdateApplicationState,
  removeApplicationFromState,
  setArchiveApplicationState,
} = jobApplicationSlice.actions;

export default jobApplicationSlice.reducer;

export const getApplications = (): AppThunk => async dispatch => {
  dispatch(setGetApplicationsState({ state: "loading", error: null }));

  try {
    const applications = await applicationService.query();
    dispatch(setApplications(applications));
    dispatch(setGetApplicationsState({ state: "succeeded", error: null }));
  } catch (error) {
    console.error(error);
    dispatch(
      setGetApplicationsState({
        state: "failed",
        error: getErrorMessage(error),
      }),
    );
  } finally {
    setTimeout(() => {
      dispatch(setGetApplicationsState({ state: "idle", error: null }));
    }, QUERY_TIMEOUT);
  }
};

export const getApplication =
  (id: string): AppThunk =>
  async dispatch => {
    dispatch(setGetApplicationState({ state: "loading", error: null }));

    try {
      const application = await applicationService.getById(id);

      dispatch(setApplication(application));
      dispatch(setGetApplicationState({ state: "succeeded", error: null }));
    } catch (error) {
      console.error(error);
      dispatch(
        setGetApplicationState({
          state: "failed",
          error: getErrorMessage(error),
        }),
      );
    } finally {
      setTimeout(() => {
        dispatch(setGetApplicationState({ state: "idle", error: null }));
      }, QUERY_TIMEOUT);
    }
  };

export const addApplication = (): AppThunk => async (dispatch, getState) => {
  dispatch(setAddApplicationState({ state: "loading", error: null }));

  try {
    const { loggedInUser } = getState().auth;
    if (!loggedInUser) throw new Error("User not logged in");
    const application = applicationService.getDefaultJobApplication(
      loggedInUser.id,
    );
    const newApplication = await applicationService.add(application);
    dispatch(addApplicationToState(newApplication));
    dispatch(setAddApplicationState({ state: "succeeded", error: null }));
  } catch (error) {
    console.error(error);
    dispatch(
      setAddApplicationState({
        state: "failed",
        error: getErrorMessage(error),
      }),
    );
  } finally {
    setTimeout(() => {
      dispatch(setAddApplicationState({ state: "idle", error: null }));
    }, QUERY_TIMEOUT);
  }
};

export const updateApplication =
  (application: JobApplication): AppThunk =>
  async dispatch => {
    dispatch(setUpdateApplicationState({ state: "loading", error: null }));

    try {
      const updatedApplication = await applicationService.update(application);
      dispatch(setUpdateApplication(updatedApplication));
      dispatch(setUpdateApplicationState({ state: "succeeded", error: null }));
    } catch (error) {
      console.error(error);
      dispatch(
        setUpdateApplicationState({
          state: "failed",
          error: getErrorMessage(error),
        }),
      );
    } finally {
      setTimeout(() => {
        dispatch(setUpdateApplicationState({ state: "idle", error: null }));
      }, QUERY_TIMEOUT);
    }
  };

export const archiveApplication =
  (application: JobApplication): AppThunk =>
  async dispatch => {
    dispatch(setArchiveApplicationState({ state: "loading", error: null }));

    try {
      const archivedApplication = await applicationService.archive(application);
      dispatch(removeApplicationFromState(archivedApplication.id));
      dispatch(setArchiveApplicationState({ state: "succeeded", error: null }));
    } catch (error) {
      console.error(error);
      dispatch(
        setArchiveApplicationState({
          state: "failed",
          error: getErrorMessage(error),
        }),
      );
    } finally {
      setTimeout(() => {
        dispatch(setArchiveApplicationState({ state: "idle", error: null }));
      }, QUERY_TIMEOUT);
    }
  };
