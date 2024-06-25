import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "../../components/Btns/Button";
import { Main } from "../../components/Gen/Main";
import { JobApplicationList } from "./JobApplicationList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getApplications,
  setApplication,
  setApplications,
} from "../../store/slices/jobApplicationSlice";
import { AppDispatch } from "../../types/app.types";
import { useJobApplication } from "../../hooks/useJobApplication";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { applicationService } from "../../services/application.service";
import { useAuth } from "../../hooks/useAuth";

const JobApplication = () => {
  const { loggedInUser } = useAuth();
  const { applications, addApplicationState } = useJobApplication();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  async function handleAddBtnClick() {
    if (!loggedInUser) return;
    const newApplication = applicationService.getDefaultJobApplication(
      loggedInUser.id,
    );
    const savedApplication = await applicationService.add(newApplication);
    dispatch(setApplications([savedApplication, ...applications]));
    dispatch(setApplication(savedApplication));
    navigate(`/job-applications/edit/${savedApplication.id}`);
  }

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  return (
    <Main className="flex w-full flex-1 flex-col items-center pb-24">
      <Button
        className="mt-4 flex h-20 items-center justify-center justify-self-start rounded-full bg-gray-600 px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl"
        onClickFn={handleAddBtnClick}
      >
        {addApplicationState.state === "loading" ? (
          <Loader />
        ) : (
          <span>Add</span>
        )}
      </Button>
      <JobApplicationList />
      <Outlet />
    </Main>
  );
};

export default JobApplication;
