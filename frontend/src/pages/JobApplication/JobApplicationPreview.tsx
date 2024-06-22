import { FC } from "react";
import { JobApplication } from "../../../../shared/types/application";
import { useNavigate } from "react-router-dom";
import { RiAlarmWarningFill } from "react-icons/ri";

type JobApplicationPreviewProps = {
  jobApplication: JobApplication;
};

export const JobApplicationPreview: FC<JobApplicationPreviewProps> = ({
  jobApplication,
}) => {
  const formattedDate = new Date(jobApplication.createdAt).toLocaleDateString(
    "he-IL",
  );

  const isWarningIconShown = jobApplication.todoList.some(
    todoItem => !todoItem.completed,
  );

  const navigate = useNavigate();

  function handleApplicationClick() {
    navigate(`/job-applications/edit/${jobApplication.id}`);
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-2 md:text-2xl">
      <div
        className="flex cursor-pointer flex-wrap items-center justify-around gap-1 hover:border-b"
        onClick={handleApplicationClick}
      >
        {isWarningIconShown && <RiAlarmWarningFill className="warning-icon" />}
        <span className="text-lg font-semibold text-gray-800 md:text-3xl">
          {jobApplication.company}
        </span>
        <span>-</span>
        <span>{jobApplication.position}</span>
        <span>-</span>
        <span>{jobApplication.status}</span>
        <span className="hidden sm:inline">-</span>
        <span className="hidden sm:inline">{formattedDate}</span>
      </div>
      <a
        href={jobApplication.url}
        target="_blank"
        rel="noreferrer noopener"
        className="ml-2"
      >
        <button
          className="flex items-center justify-center rounded-full bg-gray-600 px-2 py-1 text-gray-100 transition-all duration-300 hover:scale-110 hover:bg-gray-800 md:px-6"
          type="button"
        >
          Link
        </button>
      </a>
    </div>
  );
};
