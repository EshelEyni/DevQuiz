import classnames from "classnames";
import { useJobApplication } from "../../hooks/useJobApplication";

const JobApplicationEdit = () => {
  const { application } = useJobApplication();

  return (
    <div
      className={classnames(
        "fixed left-0 top-0 z-[1000] flex h-screen w-screen flex-col overflow-scroll bg-gray-800 p-8 md:left-1/2 md:top-1/2 md:h-4/5 md:w-3/5 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl",
        {
          "justify-center": !application,
        },
      )}
    >
      JobApplicationEdit
    </div>
  );
};

export default JobApplicationEdit;
