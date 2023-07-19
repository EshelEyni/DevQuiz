import "./QuestionLoader.scss";
import { FaFileCode } from "react-icons/fa";
import { brightColors } from "../../../services/utils.service";

export const QuestionLoader = () => {
  return (
    <div className="loader-container">
      <div className="container">
        <span></span>
        <div className="center">
          <div className="wrap">
            <div className="box">
              {brightColors.map((color, index) => (
                <FaFileCode key={index} className="code-file-icon" color={color} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
