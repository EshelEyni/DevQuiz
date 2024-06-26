import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Btns/Button";
import { copyToClipboard } from "../../services/utils.service";
import toast from "react-hot-toast";

export const SocialLinks = () => {
  const { loggedInUser } = useAuth();

  function handleBtnClick(link: string) {
    copyToClipboard(link);
    toast.success("Link copied to clipboard", {
      style: {
        background: "#333",
        color: "#fff",
        fontSize: "13px",
        fontWeight: "600",
      },
    });
  }

  if (!loggedInUser) return null;
  const links = [
    {
      name: "LinkedIn",
      link: loggedInUser.linkedInProfile,
    },
    {
      name: "GitHub",
      link: loggedInUser.githubProfile,
    },
    {
      name: "Portfolio",
      link: loggedInUser.portfolio,
    },
  ];

  return (
    <div className="my-3 flex w-full max-w-[700px] items-center justify-between px-3">
      {links.map(l => {
        if (!l.link) return null;
        return (
          <Button
            key={l.name}
            className="rounded-full border-2 border-white px-6 py-3 text-4xl text-white"
            onClickFn={() => handleBtnClick(l.link as string)}
          >
            {l.name}
          </Button>
        );
      })}
    </div>
  );
};
