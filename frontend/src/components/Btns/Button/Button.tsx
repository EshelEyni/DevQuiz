import { FC } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClickFn?: () => void;
};

export const Button: FC<ButtonProps> = ({ children, className, onClickFn }) => {
  return (
    <button
      onClick={onClickFn}
      className={
        "rounded-full bg-gray-700 px-12 py-7 text-3xl font-medium uppercase text-gray-100 transition-all hover:scale-105" +
        " " +
        className
      }
    >
      {children}
    </button>
  );
};
