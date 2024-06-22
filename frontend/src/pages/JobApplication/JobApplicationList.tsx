import { useJobApplication } from "../../hooks/useJobApplication";
import { JobApplicationCategory } from "./JobApplicationCategory";

export const JobApplicationList = () => {
  const { categorizedApplications } = useJobApplication();
  return (
    <div className="mt-8 flex w-full max-w-[700px] flex-col gap-8 sm:px-4">
      <JobApplicationCategory
        title="This Week"
        applications={categorizedApplications.thisWeek}
      />
      <JobApplicationCategory
        title="Last Week"
        applications={categorizedApplications.lastWeek}
      />
      <JobApplicationCategory
        title="Earlier"
        applications={categorizedApplications.earlier}
      />
    </div>
  );
};
