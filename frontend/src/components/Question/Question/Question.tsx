import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store/types";
import { Question as TypeOfQuestion } from "../../../../../shared/types/question";
import { OptionList } from "../../Option/OptionList/OptionList";
import { BtnQuestionEdit } from "../../Btns/BtnQuestionEdit/BtnQuestionEdit";
import { Footer } from "../../Gen/Footer";
import { ProgressBar } from "../../Quiz/ProgressBar/ProgressBar";
import { Timer } from "../../Quiz/Timer/Timer";
import { BtnNext } from "../../Btns/BtnNext/BtnNext";
import "./Question.scss";
import { BtnApproveQuestion } from "../../Btns/BtnApproveQuestion/BtnApproveQuestion";
import { BtnMarkQuesitonToEdit } from "../../Btns/BtnMarkQuesitonToEdit/BtnMarkQuesitonToEdit";
import { useAuth } from "../../../hooks/useAuth";
import { useQuiz } from "../../../hooks/useQuiz";
import { setIsTimerOn } from "../../../store/slices/quizSlice";
import { updateQuestion } from "../../../store/slices/questionSlice";

export const Question = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();
  const { questions, questionIdx, answerIdx } = useQuiz();

  const question: TypeOfQuestion = questions[questionIdx];
  const isAdmin = loggedInUser?.roles.includes("admin");
  const isQuestionRevised = question.isMarkedToBeRevised ?? false;

  function handleBtnEditClick() {
    dispatch(setIsTimerOn(false));
    const { id } = question;
    navigate(`question-edit/${id}`);
  }

  function handleBtnApproveClick() {
    const questionToApprove = { ...question, isRevised: true };
    dispatch(updateQuestion(questionToApprove));
  }

  function handleBtnMarkToEditClick() {
    const questionToMarkToEdit = {
      ...question,
      isMarkedToBeRevised: !isQuestionRevised,
    };
    dispatch(updateQuestion(questionToMarkToEdit));
  }

  return (
    <section>
      <ProgressBar />
      <div>
        <div className="question-header">
          <h4>{question.question}</h4>
          <div className="question-header-btn-container">
            {isAdmin && (
              <>
                <BtnMarkQuesitonToEdit
                  isMarkedToBeRevised={isQuestionRevised}
                  handleBtnMarkToEditClick={handleBtnMarkToEditClick}
                />
                <BtnApproveQuestion
                  handleBtnApproveClick={handleBtnApproveClick}
                />
                <BtnQuestionEdit
                  handleBtnEditClick={handleBtnEditClick}
                  size={24}
                />
              </>
            )}
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
