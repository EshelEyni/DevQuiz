import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch } from "../store/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getUser } from "../store/actions/user.actions";
import { ModalContainer } from "../components/modals/ModalContainer";

export const ProfileDetails = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userModule);

  useEffect(() => {
    const id = params.id;
    if (id) dispatch(getUser(id));
  }, [params]);

  return (
    <main>
      <h1>ProfileDetails</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <ModalContainer />
    </main>
  );
};
