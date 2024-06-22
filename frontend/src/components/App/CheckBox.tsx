import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";

type CheckBoxProps = {
  isChecked: boolean;
  handleClick: () => void;
  size?: number;
  color?: string;
};

export const CheckBox = ({
  isChecked,
  handleClick,
  size = 40,
  color = "white",
}: CheckBoxProps) => {
  return (
    <div className="cursor-pointer" onClick={handleClick}>
      {isChecked ? (
        <BiCheckboxChecked size={size} color={color} />
      ) : (
        <BiCheckbox size={size} color={color} />
      )}
    </div>
  );
};
