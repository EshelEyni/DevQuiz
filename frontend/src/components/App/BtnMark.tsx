import { ReactNode, ReactElement, cloneElement } from "react";

type BtnMarkProps = {
  checked: boolean;
  size?: number;
  color?: string;
  onClickFn?: () => void;
  icons: {
    checked: ReactNode;
    unchecked: ReactNode;
  };
};

export const BtnMark = ({
  checked,
  size = 24,
  color = "#495057",
  onClickFn,
  icons,
}: BtnMarkProps) => {
  const checkedIcon = cloneElement(icons.checked as ReactElement, {
    size,
    color,
  });
  const uncheckedIcon = cloneElement(icons.unchecked as ReactElement, {
    size,
    color,
  });

  return (
    <button onClick={onClickFn}>{checked ? checkedIcon : uncheckedIcon}</button>
  );
};
