import { FC } from "react";

interface CircularProgressBarProps {
  percentage: number;
  themeColor: string;
}

export const CircularProgressBar: FC<CircularProgressBarProps> = ({
  percentage,
  themeColor,
}) => {
  const background = `radial-gradient(closest-side,  rgb(71 85 99) 80%, transparent 81%),
  conic-gradient(${themeColor} ${
    percentage > 100 ? 100 : percentage
  }%, rgb(241 245 249) 0)`;

  return (
    <div className="relative my-auto flex h-40 w-40 items-center justify-center">
      <div className="h-full w-full rounded-full" style={{ background }} />
    </div>
  );
};
