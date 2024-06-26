import { useJobApplication } from "../../hooks/useJobApplication";
import { JobApplicationCategory } from "./JobApplicationCategory";

export const JobApplicationList = () => {
  const { categorizedApplications } = useJobApplication();
  return (
    <div className="flex w-full max-w-[800px] flex-col gap-8">
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
