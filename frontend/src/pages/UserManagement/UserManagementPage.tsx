import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/types";
import { getUsers } from "../../store/actions/user.actions";
import { RootState } from "../../store/store";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { NoResMsg } from "../../components/Msg/NoResMsg/NoResMsg";
import { ManagementEntityListContainer } from "../../components/Management/ManagementEntityListContainer/ManagementEntityListContainer";
import { ManagementEntityCounter } from "../../components/Management/ManagementEntityCounter/ManagementEntityCounter";
import { ManagementEntityList } from "../../components/Management/ManagementEntityList/ManagementEntityList";

export const UserManagementPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, isLoading } = useSelector(
    (state: RootState) => state.userModule,
  );

  const noUsersFound = !isLoading && users.length === 0;

  useEffect(() => {
    dispatch(getUsers());
  }, []);

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
