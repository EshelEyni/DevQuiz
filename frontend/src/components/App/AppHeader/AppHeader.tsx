import { Link, useLocation } from "react-router-dom";
import { Header } from "../../Gen/Header";
import { useAuth } from "../../../hooks/useAuth";
import { IoIosSettings, IoIosLogIn, IoIosHome } from "react-icons/io";
import { useQuiz } from "../../../hooks/useQuiz";
import { BsPatchQuestionFill } from "react-icons/bs";
import { FaUsersCog, FaUserCircle, FaBookOpen } from "react-icons/fa";

export const AppHeader = () => {
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
  const linkClass =
    "text-4xl xl:text-5xl uppercase text-indigo-50 hidden lg:block font-medium  hover:text-sky-600 transition duration-300 ease-in-out";
  const iconClass =
    "cursor-pointer text-7xl text-white lg:hidden  hover:text-sky-600 transition duration-300 ease-in-out";

  return (
    <Header className="flex w-full items-center justify-between bg-indigo-800 px-8 py-8">
      <nav className="flex items-center gap-8">
        {isHomepage && (
          <Link
            to="/home/settings"
            className={!isSettingShown ? " invisible" : ""}
          >
            <IoIosSettings className={iconClass} />
            <span className={linkClass}>settings</span>
          </Link>
        )}

        {!isHomepage && (
          <>
            <Link to="/home">
              <IoIosHome className={iconClass} />
              <span className={linkClass}>Homepage</span>
            </Link>
            {isQuestionEditLinkShown && (
              <Link to="/question-management">
                <BsPatchQuestionFill className={iconClass} />
                <span className={linkClass}>question editor</span>
              </Link>
            )}
            {isUserAdmin && (
              <Link to="/user-management">
                <FaUsersCog className={iconClass} />
                <span className={linkClass}>user mamagement</span>
              </Link>
            )}
          </>
        )}
      </nav>

      <nav className="flex items-center gap-8">
        <Link to="/about">
          <FaBookOpen className={iconClass} />
          <span className={linkClass}>About</span>
        </Link>
        <Link to={loggedInUser ? `/profile/${loggedInUser.id}` : "/home/auth"}>
          {loggedInUser ? (
            <FaUserCircle className={iconClass} />
          ) : (
            <IoIosLogIn className={iconClass} />
          )}
          <span className={linkClass}>
            {loggedInUser ? loggedInUser.username : "Login"}
          </span>
        </Link>
      </nav>
    </Header>
  );
};
