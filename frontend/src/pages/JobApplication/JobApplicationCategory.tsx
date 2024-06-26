import { FC } from "react";
import { JobApplicationPreview } from "./JobApplicationPreview";
import { JobApplication } from "../../../../shared/types/application";

interface JobApplicationCategoryProps {
  title: string;
  applications: JobApplication[];
}

export const JobApplicationCategory: FC<JobApplicationCategoryProps> = ({
  title,
  applications,
}) => {
  if (applications.length === 0) return null;
  const numOfApplications = applications.length;
  const numOfApplicationsText =
    numOfApplications === 1 ? "application" : "applications";
  return (
    <div className="w-full bg-white py-4 shadow-md md:rounded-lg">
      <h2 className="mb-4 px-2 text-4xl font-semibold text-gray-800 md:px-4">
        {title} ({numOfApplications} {numOfApplicationsText})
      </h2>
      <ul>
        {applications.map(application => (
          <li key={application.id}>
            <JobApplicationPreview jobApplication={application} />
          </li>
        ))}
      </ul>
    </div>
  );
};
