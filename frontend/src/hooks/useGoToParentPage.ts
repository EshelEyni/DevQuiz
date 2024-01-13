import { useLocation, useNavigate } from "react-router-dom";

export function useGoToParentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  function goToParentPage() {
    const parentPath = location.pathname.substring(
      0,
      location.pathname.lastIndexOf("/"),
    );
    navigate(parentPath);
  }

  return goToParentPage;
}
