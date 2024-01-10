import { Link, useLocation } from "react-router-dom";
import { Header } from "../../Gen/Header";
import { useAuth } from "../../../hooks/useAuth";
import { IoIosSettings, IoIosLogIn, IoIosHome } from "react-icons/io";
import { useQuiz } from "../../../hooks/useQuiz";
import { BsPatchQuestionFill } from "react-icons/bs";
import { FaUsersCog, FaUserCircle, FaBookOpen } from "react-icons/fa";
import { cloneElement } from "react";

type NavLinks = {
  name: string;
  icon: JSX.Element;
  link: string;
  condition: boolean;
};

export const AppHeader = () => {
  const location = useLocation();
  const { loggedInUser } = useAuth();
  const { status } = useQuiz();

  const isHomepage = location.pathname.includes("/home");
  const isQuestionEditLinkShown =
    !isHomepage &&
    loggedInUser &&
    loggedInUser?.roles.some(role => role === "admin" || role === "editor");

  const isUserAdmin =
    !isHomepage &&
    loggedInUser &&
    loggedInUser?.roles.some(role => role === "admin");

  const isSettingShown = status === "ready" && isHomepage;
  const iconClass =
    "cursor-pointer text-4xl text-white transition  duration-300 ease-in-out hover:text-sky-600 md:hidden";

  const leftNavLinks: NavLinks[] = [
    {
      name: "settings",
      icon: <IoIosSettings />,
      link: "/home/settings",
      condition: isSettingShown,
    },
    {
      name: "Homepage",
      icon: <IoIosHome />,
      link: "/home",
      condition: !isHomepage,
    },
    {
      name: "question editor",
      icon: <BsPatchQuestionFill />,
      link: "/question-management",
      condition: !!isQuestionEditLinkShown,
    },
    {
      name: "user mamagement",
      icon: <FaUsersCog />,
      link: "/user-management",
      condition: !!isUserAdmin,
    },
  ];

  const rightNavLinks: NavLinks[] = [
    {
      name: "About",
      icon: <FaBookOpen />,
      link: "/about",
      condition: true,
    },
    {
      name: "Login",
      icon: <IoIosLogIn />,
      link: "/home/auth",
      condition: !loggedInUser,
    },
    {
      name: loggedInUser?.username || "Profile",
      icon: <FaUserCircle />,
      link: `/profile/${loggedInUser?.id}`,
      condition: !!loggedInUser,
    },
  ];

  return (
    <Header className="flex w-full items-center justify-between bg-gray-800 px-3 py-2 md:px-4 md:py-3">
      <nav className="flex items-center gap-3">
        {leftNavLinks.map(
          ({ name, icon, link, condition }) =>
            condition && (
              <Link key={name} to={link}>
                {cloneElement(icon, { className: iconClass })}
                <span className="hidden text-2xl font-medium uppercase text-gray-50 transition duration-300  ease-in-out hover:text-sky-600 md:block">
                  {name}
                </span>
              </Link>
            ),
        )}
      </nav>

      <nav className="flex items-center gap-3">
        {rightNavLinks.map(
          ({ name, icon, link, condition }) =>
            condition && (
              <Link key={name} to={link}>
                {cloneElement(icon, { className: iconClass })}
                <span className="hidden text-2xl font-medium uppercase text-gray-50 transition duration-300  ease-in-out hover:text-sky-600 md:block">
                  {name}
                </span>
              </Link>
            ),
        )}
      </nav>
    </Header>
  );
};
