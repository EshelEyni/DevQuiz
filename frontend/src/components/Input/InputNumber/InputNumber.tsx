import "./InputNumber.scss";
import { FC } from "react";

type InputNumberProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  max: number;
  name: string;
};

export const InputNumber: FC<InputNumberProps> = ({
  handleChange,
  value,
  max,
  name,
}) => {
  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          type="number"
          className="input-number"
          name={name}
          min={0}
          max={max}
          value={value}
          onChange={handleChange}
        />
        <label htmlFor={name}>*Seconds Per Question</label>
      </div>
    </div>
  );
};
