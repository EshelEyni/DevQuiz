import "./ManagementEntityCounter.scss";

type ManagementEntityCounterProps = {
  title: string;
  count: number;
};

export const ManagementEntityCounter = ({ title, count }: ManagementEntityCounterProps) => {
  return <p className="management-page-counter">{`Number of ${title}: ${count}`}</p>;
};
