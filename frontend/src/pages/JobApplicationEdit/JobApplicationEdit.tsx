import classnames from "classnames";
import { useJobApplication } from "../../hooks/useJobApplication";
import { MainScreen } from "../../components/Gen/MainScreen";
import { useNavigate } from "react-router-dom";

import { JobApplication } from "../../../../shared/types/application";

function getDefaultJobApplication(): JobApplication {
  return {
    id: "default-id",
    userId: "default-user-id",
    status: "draft",
    url: "",
    notes: "",
    contacts: [],
    company: "",
    position: "",
    todoList: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isArchived: false,
  };
}

const JobApplicationEdit = () => {
  const { application } = useJobApplication();

  const navigate = useNavigate();

  function onGoBack() {
    navigate("/job-applications");
  }

  return (
    <>
      <MainScreen onClickFn={onGoBack} darkMode={true} />
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
    </>
  );
};

export default JobApplicationEdit;
