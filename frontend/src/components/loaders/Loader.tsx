type LoaderProps = {
  title?: string;
};

function Loader({ title }: LoaderProps) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      {title && <p>{title}</p>}
    </div>
  );
}

export default Loader;
