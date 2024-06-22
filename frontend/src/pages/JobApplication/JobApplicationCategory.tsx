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

  return (
    <div className="w-full bg-white p-4 shadow-md sm:rounded-lg">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">{title}</h2>
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
