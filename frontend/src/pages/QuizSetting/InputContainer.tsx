import { FC } from "react";

type InputContainerProps = {
  children: React.ReactNode;
  title: string;
};

export const InputContainer: FC<InputContainerProps> = ({
  children,
  title,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-medium text-gray-700">{title}</h2>
      {children}
    </div>
  );
};
