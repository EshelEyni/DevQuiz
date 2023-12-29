import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { NoResMsg } from "../../components/Msg/NoResMsg/NoResMsg";
import { ManagementEntityListContainer } from "../../components/Management/ManagementEntityListContainer/ManagementEntityListContainer";
import { ManagementEntityCounter } from "../../components/Management/ManagementEntityCounter/ManagementEntityCounter";
import { ManagementEntityList } from "../../components/Management/ManagementEntityList/ManagementEntityList";
import { useUsers } from "../../hooks/useUser";
import { getUsers } from "../../store/slices/userSlice";

export const UserManagementPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, getUsersState } = useUsers();

  const isLoading = getUsersState.state === "loading";
  const noUsersFound = !isLoading && users.length === 0;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <main className="management-page">
      {isLoading ? (
        <Loader title="getting users" />
      ) : (
        <ManagementEntityListContainer>
          {noUsersFound ? (
            <NoResMsg title="user" />
          ) : (
            <>
              <ManagementEntityCounter title="Users" count={users.length} />
              <ManagementEntityList entities={users} />
            </>
          )}
        </ManagementEntityListContainer>
      )}
    </main>
  );
};
