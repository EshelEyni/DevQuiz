import { useLocation, useNavigate } from "react-router-dom";
import { BtnAuth } from "../../Btns/BtnAuth/BtnAuth";
import { BtnLink } from "../../Btns/BtnLink/BtnLink";
import { Header } from "../../Gen/Header";
import { useAuth } from "../../../hooks/useAuth";
import { IoIosSettings } from "react-icons/io";
import { useQuiz } from "../../../hooks/useQuiz";

export const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedInUser } = useAuth();
  const { status } = useQuiz();
  const isQuestionEditLinkShown =
    loggedInUser &&
    loggedInUser?.roles.some(role => role === "admin" || role === "editor");

  const isUserAdmin =
    loggedInUser && loggedInUser?.roles.some(role => role === "admin");

  const isHomepage = location.pathname.includes("/home");
  const isSettingShown = status === "ready" && isHomepage;
  console.log("isSettingShown", isSettingShown);

  function handleSettingsClick() {
    navigate("/home/settings");
  }

  return (
    <Header className="flex w-full items-center justify-between bg-indigo-800 px-8 py-6">
      {isHomepage && (
        <IoIosSettings
          className={
            "cursor-pointer text-7xl text-white" +
            (!isSettingShown ? " invisible" : "")
          }
          onClick={handleSettingsClick}
        />
      )}

      {!isHomepage && (
        <div className="flex items-center gap-2">
          <BtnLink path="/home" title="Homepage" />
          {isQuestionEditLinkShown && (
            <BtnLink path="/question-management" title="question editor" />
          )}
          {isUserAdmin && (
            <BtnLink path="/user-management" title="user mamagement" />
          )}
        </div>
      )}
      <div className="flex items-center gap-2">
        <BtnLink path="/about" title="About" />
        <BtnAuth />
      </div>
    </Header>
  );
};
