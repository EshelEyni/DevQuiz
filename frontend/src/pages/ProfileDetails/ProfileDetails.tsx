import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch } from "../../store/types";
import { useDispatch } from "react-redux";
import { useUsers } from "../../hooks/useUser";
import { getUser } from "../../store/slices/userSlice";

export const ProfileDetails = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useUsers();

  useEffect(() => {
    const id = params.id;
    if (id) dispatch(getUser(id));
  }, [params, dispatch]);

  return (
    <main>
      <h1>ProfileDetails</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
};
