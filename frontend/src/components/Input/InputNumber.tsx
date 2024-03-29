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
        "flex w-max items-center justify-around gap-1 rounded-full bg-gray-700 px-6 py-3" +
        " " +
        className
      }
    >
      <FaChevronLeft
        className="cursor-pointer text-3xl font-medium text-gray-50"
        onClick={() => updateNumber(-1)}
      />
      <input
        type="number"
        className="max-h-content w-12 bg-transparent pb-1 text-center text-3xl font-medium text-gray-50 md:text-4xl"
        name={name}
        min={1}
        max={max}
        value={value}
        onChange={handleChange}
      />
      <FaChevronRight
        className="cursor-pointer text-3xl font-medium text-gray-50"
        onClick={() => updateNumber(1)}
      />
    </div>
  );
};
