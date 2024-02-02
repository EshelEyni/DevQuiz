import { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type InputNumberProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateNumber: (n: number) => void;
  value: number;
  max: number;
  name: string;
  className?: string;
};

export const InputNumber: FC<InputNumberProps> = ({
  handleChange,
  updateNumber,
  value,
  max,
  name,
  className = "",
}) => {
  return (
    <div
      className={
        "flex w-max items-center justify-center gap-1 rounded-full bg-gray-700 px-12 py-8 md:px-8 md:py-3" +
        " " +
        className
      }
    >
      <FaChevronLeft
        className="cursor-pointer text-5xl font-medium text-gray-50 md:text-4xl"
        onClick={() => updateNumber(-1)}
      />
      <input
        type="number"
        className="max-h-content w-24 bg-transparent pb-0 text-center text-5xl font-medium text-gray-50 md:w-20 md:pb-1"
        name={name}
        min={0}
        max={max}
        value={value}
        onChange={handleChange}
      />
      <FaChevronRight
        className="cursor-pointer text-5xl font-medium text-gray-50 md:text-4xl"
        onClick={() => updateNumber(1)}
      />
    </div>
  );
};
