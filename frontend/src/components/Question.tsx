import { OptionList } from "./option/OptionList";
import { Question as TypeOfQuestion } from "../../../shared/types/question";
import { BtnReportQuestion } from "./btns/BtnReportQuestion";
import { BtnQuestionEdit } from "./admin/BtnQuestionEdit";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { ProgressBar } from "./ProgressBar";
import { Footer } from "./Footer";
import { Timer } from "./Timer";
import { BtnNext } from "./btns/BtnNext";

export const Question = () => {
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);
  const { questions, questionIdx, points, answerIdx } = useSelector(
    (state: RootState) => state.quizModule
  );
  const question: TypeOfQuestion = questions[questionIdx];

  const isAdmin = loggedinUser?.roles.includes("admin");
  const navigate = useNavigate();
  function handleBtnEditClick() {
    const { id } = question;
    navigate(`question-edit/${id}`);
  }

  return (
    <section>
      <ProgressBar />
      <div>
        <div className="question-header">
          <h4>{question.question}</h4>
          <div className="question-header-btn-container">
            {isAdmin && <BtnQuestionEdit handleBtnEditClick={handleBtnEditClick} size={24} />}
            <BtnReportQuestion />
          </div>
        </div>
        <OptionList question={question} />
      </div>
      <Footer>
        <Timer />
        {answerIdx !== null && <BtnNext />}
      </Footer>
    </section>
  );
};
