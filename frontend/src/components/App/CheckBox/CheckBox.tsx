import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";

type CheckBoxProps = {
  checked: boolean;
  size?: number;
  color?: string;
};

export const CheckBox = ({ checked, size = 40, color = "white" }: CheckBoxProps) => {
  return (
    <div>
      {checked ? (
        <BiCheckboxChecked size={size} color={color} />
      ) : (
        <BiCheckbox size={size} color={color} />
      )}
    </div>
  );
};
