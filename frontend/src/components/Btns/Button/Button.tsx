import { FC } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClickFn?: () => void;
  type?: "button" | "submit" | "reset";
};

export const Button: FC<ButtonProps> = ({
  children,
  className,
  onClickFn,
  type = "button",
}) => {
  return (
    <button
      onClick={onClickFn}
      className={
        "rounded-full bg-gray-700 text-3xl font-medium uppercase text-gray-100 transition-all hover:scale-105" +
        " " +
        className
      }
      type={type}
    >
      {children}
    </button>
  );
};
