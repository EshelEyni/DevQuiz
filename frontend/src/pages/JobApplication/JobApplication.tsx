import { Outlet } from "react-router-dom";
import { Button } from "../../components/Btns/Button";
import { Main } from "../../components/Gen/Main";
import { JobApplicationList } from "./JobApplicationList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addApplication,
  getApplications,
} from "../../store/slices/jobApplicationSlice";
import { AppDispatch } from "../../types/app.types";

const JobApplication = () => {
  const dispatch: AppDispatch = useDispatch();

  function handleAddBtnClick() {
    dispatch(addApplication());
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
        Add
      </Button>
      <JobApplicationList />
      <Outlet />
    </Main>
  );
};

export default JobApplication;
