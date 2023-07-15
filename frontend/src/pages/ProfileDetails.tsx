import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch } from "../store/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

export const ProfileDetails = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userModule);

  useEffect(() => {
    const id = params.id;
  }, [params]);

  return (
    <main>
      <h1>ProfileDetails</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
};
