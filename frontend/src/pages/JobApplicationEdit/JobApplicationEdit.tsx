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
import { Loader } from "../../components/Loaders/Loader/Loader";
import { JobApplication } from "../../../../shared/types/application";
import { ContactList } from "../../components/JobApplication/ContactList";
import { TodoList } from "../../components/JobApplication/TodoList";
import { Button } from "../../components/Btns/Button";
import { ImgList } from "../../components/JobApplication/ImgList";

const JobApplicationEdit = () => {
  const { application, getApplicationState } = useJobApplication();
  const textFields: Array<keyof JobApplication> = [
    "company",
    "position",
    "status",
    "url",
    "notes",
  ];
  const isLoading = getApplicationState.state === "loading";
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  function onGoBack() {
    navigate("/job-applications");
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
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
    onGoBack();
  }

  useEffect(() => {
    const { id } = params;
    if (id) dispatch(getApplication(id));

    return () => {
      dispatch(setApplication(null));
    };
  }, [params, dispatch]);

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
        {isLoading && <Loader />}
        {!isLoading && application && (
          <>
            <div className="mb-5 flex w-full items-center justify-between">
              <h1 className="text-3xl font-bold text-white">Job Application</h1>
              <Button
                onClickFn={onGoBack}
                className="flex h-16 items-center justify-center gap-2 self-center rounded-full bg-gray-600 px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
              >
                <span>Go Back</span>
              </Button>
            </div>

            {textFields.map(field => (
              <div key={field} className="flex flex-col gap-3">
                <h2 className="text-3xl font-bold capitalize text-white underline">
                  {field !== "url" ? field : "Link"}
                </h2>

                {field !== "notes" ? (
                  <input
                    type="text"
                    defaultValue={application?.[field] as string}
                    onChange={handleChange}
                    className="w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none"
                    name={field}
                    placeholder={field !== "url" ? field : "Link"}
                  />
                ) : (
                  <textarea
                    onChange={handleChange}
                    defaultValue={application?.notes}
                    name="notes"
                    className="w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none"
                  />
                )}
              </div>
            ))}

            <ImgList isEdit={true} />
            <ContactList isEdit={true} />
            <TodoList isEdit />

            <hr className="mb-5 mt-5 border-t-2 border-gray-600" />

            <Button
              onClickFn={handleSave}
              className="mt-2 flex h-20 items-center justify-center gap-2 self-center justify-self-start rounded-full bg-gray-600 px-10 py-2 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-3xl"
            >
              <span>Save</span>
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default JobApplicationEdit;
