import { FC, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type ImgDisplayProps = {
  src: string;
};

export const ImgDisplay: FC<ImgDisplayProps> = ({ src }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { outsideClickRef } = useOutsideClick<HTMLImageElement>(() =>
    setIsOpened(false),
  );
  const className = isOpened
    ? "fixed inset-0 z-50 cursor-pointer"
    : "w-1/4 h-1/4 cursor-pointer";

  return (
    <img
      src={src}
      alt="img"
      className={className}
      onClick={() => setIsOpened(!isOpened)}
      ref={outsideClickRef}
    />
  );
};
