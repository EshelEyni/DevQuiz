import { useNavigate } from "react-router-dom";

type BtnLinkProps = {
  path: string;
  title: string;
};

export const BtnLink = ({ path, title }: BtnLinkProps) => {
  const navigate = useNavigate();

  function onGoToLink() {
    navigate(path);
  }
  return (
    <button className="btn-app" onClick={onGoToLink}>
      {title}
    </button>
  );
};
