import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "../../components/Btns/Button";
import { Main } from "../../components/Gen/Main";

const JobApplication = () => {
  const navigate = useNavigate();

  function handleAddBtnClick() {
    navigate("/job-applications/edit");
  }

  return (
    <Main className="flex w-full flex-1 flex-col items-center pb-24">
      <Button onClickFn={handleAddBtnClick}>Add</Button>
      <Outlet />
    </Main>
  );
};

export default JobApplication;
