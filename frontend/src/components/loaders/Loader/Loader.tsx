import { FC } from "react";
import "./Loader.scss";

type LoaderProps = {
  title?: string;
  className?: string;
};

export const Loader: FC<LoaderProps> = ({ title, className }: LoaderProps) => {
  return (
    <div
      className={`flex flex-1 items-center justify-center text-gray-500 ${className}`}
    >
      <div className="loader" />
      {title && <p>{title}</p>}
    </div>
  );
};
