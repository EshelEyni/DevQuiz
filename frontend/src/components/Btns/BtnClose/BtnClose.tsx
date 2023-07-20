import { GrClose } from "react-icons/gr";
import "./BtnClose.css";

interface BtnCloseProps {
  onClickBtn: () => void;
}

export const BtnClose: React.FC<BtnCloseProps> = ({ onClickBtn }) => {
  return (
    <div className="btn-close-container">
      <button className="btn-close" onClick={onClickBtn}>
        <GrClose />
      </button>
    </div>
  );
};
