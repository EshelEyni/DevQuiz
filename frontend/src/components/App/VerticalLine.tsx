import { FC } from "react";

type VerticalLineProps = {
  height?: string;
};

export const VerticalLine: FC<VerticalLineProps> = ({ height = "full" }) => {
  return <div className={`h-${height} w-0 border-l border-gray-50`} />;
};
