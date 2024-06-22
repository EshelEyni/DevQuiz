import { useSelector } from "react-redux";
import { RootState } from "../types/app.types";

export function useJobApplication() {
  const {
    applications,
    getApplicationsState,
    application,
    getApplicationState,
    addApplicationState,
    updateApplicationState,
    archiveApplicationState,
  } = useSelector((state: RootState) => state.jobApplication);

  return {
    applications,
    getApplicationsState,
    application,
    getApplicationState,
    addApplicationState,
    updateApplicationState,
    archiveApplicationState,
  };
}
