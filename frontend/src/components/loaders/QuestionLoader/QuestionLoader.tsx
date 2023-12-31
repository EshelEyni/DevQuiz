import "./QuestionLoader.scss";
import { FaFileCode } from "react-icons/fa";
import { brightColors } from "../../../services/utils.service";

export const QuestionLoader = () => {
  return (
    <div className="question-loader-container">
      <div className="question-loader-inner-container">
        <span className="maginifying-glass-handle"></span>
        <div className="center">
          <div className="wrap">
            <div className="box">
              {brightColors.map((color, index) => (
                <div key={index} className="code-file-icon-container">
                  <FaFileCode className="code-file-icon" color={color} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
