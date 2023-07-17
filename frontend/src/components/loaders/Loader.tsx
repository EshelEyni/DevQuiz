type LoaderProps = {
  title?: string;
};

export const Loader = ({ title }: LoaderProps) => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      {title && <p>{title}</p>}
    </div>
  );
};
