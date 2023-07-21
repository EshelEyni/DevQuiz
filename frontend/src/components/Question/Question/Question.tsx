import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store/types";
import { setIsTimerOn } from "../../../store/actions/quiz.actions";
import { RootState } from "../../../store/store";
import { Question as TypeOfQuestion } from "../../../../../shared/types/question";
import { OptionList } from "../../Option/OptionList/OptionList";
import { BtnReportQuestion } from "../../Btns/BtnReportQuestion/BtnReportQuestion";
import { BtnQuestionEdit } from "../../Btns/BtnQuestionEdit/BtnQuestionEdit";
import { Footer } from "../../Footer";
import { ProgressBar } from "../../Quiz/ProgressBar/ProgressBar";
import { Timer } from "../../Quiz/Timer/Timer";
import { BtnNext } from "../../Btns/BtnNext/BtnNext";
import "./Question.scss";

export const Question = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);
  const { questions, questionIdx, answerIdx } = useSelector((state: RootState) => state.quizModule);
  const question: TypeOfQuestion = questions[questionIdx];

  const isAdmin = loggedinUser?.roles.includes("admin");
  const navigate = useNavigate();

  function handleBtnEditClick() {
    dispatch(setIsTimerOn(false));
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
