import { useSelector } from "react-redux";
import { RootState } from "../types/app.types";
import { JobApplication } from "../../../shared/types/application";

function categorizeApplications(applications: JobApplication[]) {
  const now = new Date();
  const thisWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay(),
  );
  const lastWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay() - 7,
  );

  const result = {
    thisWeek: [] as JobApplication[],
    lastWeek: [] as JobApplication[],
    earlier: [] as JobApplication[],
  };

  applications.forEach(application => {
    const createdAt = new Date(application.createdAt);
    if (createdAt >= thisWeek) {
      result.thisWeek.push(application);
    } else if (createdAt >= lastWeek && createdAt < thisWeek) {
      result.lastWeek.push(application);
    } else {
      result.earlier.push(application);
    }
  });

  result.thisWeek.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  result.lastWeek.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  result.earlier.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return result;
}

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

  const categorizedApplications = categorizeApplications(applications);

  return {
    applications,
    categorizedApplications,
    getApplicationsState,
    application,
    getApplicationState,
    addApplicationState,
    updateApplicationState,
    archiveApplicationState,
  };
}
