import classnames from "classnames";
import { useJobApplication } from "../../hooks/useJobApplication";
import { MainScreen } from "../../components/Gen/MainScreen";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import {
  getApplication,
  setApplication,
  updateApplication,
} from "../../store/slices/jobApplicationSlice";
import { JobApplicationField } from "./JobApplicationEditField";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { JobApplication } from "../../../../shared/types/application";
import { FaCheck } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { ContactList } from "./ContactList";
import { TodoList } from "./TodoList";
import { Button } from "../../components/Btns/Button";

const JobApplicationEdit = () => {
  const { application, getApplicationState } = useJobApplication();

  const params = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  function onGoBack() {
    navigate("/job-applications");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;

    const newApplication = {
      ...application,
      [name]: value,
    } as JobApplication;

    dispatch(setApplication(newApplication));
  }

  function handleSave() {
    if (!application) return;
    dispatch(updateApplication({ ...application }));
  }

  useEffect(() => {
    const { id } = params;
    dispatch(getApplication(id || ""));

    return () => {
      dispatch(setApplication(null));
    };
  }, [params, dispatch]);

  if (getApplicationState.state === "loading") return <Loader />;
  return (
    <>
      <MainScreen onClickFn={onGoBack} darkMode={true} />
      <div
        className={classnames(
          "fixed left-0 top-0 z-[1000] flex h-screen w-screen flex-col gap-3 overflow-scroll bg-gray-800 p-8 md:left-1/2 md:top-1/2 md:h-4/5 md:w-3/5 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl",
          {
            "justify-center": !application,
          },
        )}
      >
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Job Application</h1>
          <Button
            onClickFn={onGoBack}
            className="flex h-16 items-center justify-center gap-2 self-center rounded-full bg-gray-600 px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
          >
            <span>Go Back</span>
          </Button>
        </div>
        <JobApplicationField>
          <JobApplicationField.DisplayElement className="text-3xl text-white">
            <div>{application?.company || "Company"}</div>
          </JobApplicationField.DisplayElement>
          <div className="flex items-center gap-4">
            <JobApplicationField.EditElement
              onChange={handleChange}
              className="w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none"
            >
              <input
                type="text"
                defaultValue={application?.company}
                name="company"
                placeholder="Company"
              />
            </JobApplicationField.EditElement>
            <JobApplicationField.SaveButton
              onSubmit={handleSave}
              className="flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
            >
              <div>
                <FaCheck />
              </div>
            </JobApplicationField.SaveButton>
          </div>
        </JobApplicationField>
        <JobApplicationField>
          <JobApplicationField.DisplayElement className="text-3xl text-white">
            <div>{application?.position || "Position"}</div>
          </JobApplicationField.DisplayElement>
          <div className="flex items-center gap-4">
            <JobApplicationField.EditElement
              onChange={handleChange}
              className="w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none"
            >
              <input
                type="text"
                defaultValue={application?.position}
                name="position"
                placeholder="Position"
              />
            </JobApplicationField.EditElement>
            <JobApplicationField.SaveButton
              onSubmit={handleSave}
              className="flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
            >
              <div>
                <FaCheck />
              </div>
            </JobApplicationField.SaveButton>
          </div>
        </JobApplicationField>
        <JobApplicationField>
          <JobApplicationField.DisplayElement className="text-3xl text-white">
            <div>{application?.status || "Status"}</div>
          </JobApplicationField.DisplayElement>
          <div className="flex items-center gap-4">
            <JobApplicationField.EditElement
              onChange={handleChange}
              className="w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none"
            >
              <input
                type="text"
                defaultValue={application?.status}
                name="status"
                placeholder="Status"
              />
            </JobApplicationField.EditElement>
            <JobApplicationField.SaveButton
              onSubmit={handleSave}
              className="flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
            >
              <div>
                <FaCheck />
              </div>
            </JobApplicationField.SaveButton>
          </div>
        </JobApplicationField>
        <JobApplicationField>
          <div className="flex flex-wrap items-center gap-4">
            <JobApplicationField.DisplayElement className="text-3xl text-blue-400 hover:underline">
              <a href={application?.url} target="_blank" rel="noreferrer">
                {application?.url || "Link"}
              </a>
            </JobApplicationField.DisplayElement>
            <JobApplicationField.EditButton className="cursor-pointer text-4xl">
              <div>
                <BiEdit />
              </div>
            </JobApplicationField.EditButton>
          </div>
          <div className="flex items-center gap-4">
            <JobApplicationField.EditElement
              onChange={handleChange}
              className="w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none"
            >
              <input
                type="text"
                defaultValue={application?.url}
                name="url"
                placeholder="Link"
              />
            </JobApplicationField.EditElement>
            <JobApplicationField.SaveButton
              onSubmit={handleSave}
              className="flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
            >
              <div>
                <FaCheck />
              </div>
            </JobApplicationField.SaveButton>
          </div>
        </JobApplicationField>
        <JobApplicationField>
          <JobApplicationField.DisplayElement className="text-3xl text-white">
            <p>{application?.notes || "notes"}</p>
          </JobApplicationField.DisplayElement>
          <div className="flex items-center gap-4">
            <JobApplicationField.EditElement
              onChange={handleChange}
              className="w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none"
            >
              <textarea defaultValue={application?.notes} name="notes" />
            </JobApplicationField.EditElement>
            <JobApplicationField.SaveButton
              onSubmit={handleSave}
              className="flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
            >
              <div>
                <FaCheck />
              </div>
            </JobApplicationField.SaveButton>
          </div>
        </JobApplicationField>

        <ContactList />

        <TodoList />
      </div>
    </>
  );
};

export default JobApplicationEdit;
