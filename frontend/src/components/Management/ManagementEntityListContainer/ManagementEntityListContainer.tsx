import "./ManagementEntityListContainer.scss";

type ManagementEntityListContainerProps = {
  children: React.ReactNode;
};

export const ManagementEntityListContainer = ({
  children,
}: ManagementEntityListContainerProps) => {
  return <div className="management-page-list-container">{children}</div>;
};
