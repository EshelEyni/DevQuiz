import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Question as TypeOfQuestion } from "../../../../shared/types/question";
import { OptionList } from "./OptionList";
import { BtnQuestionEdit } from "../../components/Btns/BtnQuestionEdit";
import { Footer } from "../../components/Gen/Footer";
import { ProgressBar } from "./ProgressBar";
import { Timer } from "./Timer";
import { BtnApproveQuestion } from "../../components/Btns/BtnApproveQuestion";
import { BtnMarkQuesitonToEdit } from "../../components/Btns/BtnMarkQuesitonToEdit";
import { useAuth } from "../../hooks/useAuth";
import { useQuiz } from "../../hooks/useQuiz";
import {
  resetQuizState,
  setHighScore,
  setIsTimerOn,
  setNextQuestionIdx,
  setStatus,
} from "../../store/slices/quizSlice";
import { updateQuestion } from "../../store/slices/questionSlice";
import { AppDispatch } from "../../types/app.types";
import { useKey } from "react-use";
import { Button } from "../../components/Btns/Button";

export const Question = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();
  const { questions, questionIdx, numQuestions, answerIdx, points, highScore } =
    useQuiz();
  const isNextBtnShown = answerIdx !== null;

  const isLastQuestionIdx = questionIdx === numQuestions - 1;

  useKey("Enter", onPassQuestion);

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

  function onPassQuestion() {
    const isValidQuestionIdx =
      questionIdx >= 0 && questionIdx < numQuestions - 1;
    if (isValidQuestionIdx) dispatch(setNextQuestionIdx());
    else if (isLastQuestionIdx) {
      dispatch(setStatus("finished"));
      const isHighScore = points > highScore;
      if (isHighScore) dispatch(setHighScore(points));
    }
  }

  function handleQuitClick() {
    dispatch(resetQuizState());
  }

  return (
    <section className="w-full max-w-[575px] px-14">
      <ProgressBar />
      <div>
        <div className="question-header">
          <h4 className="mb-16 text-4xl font-bold text-gray-50 md:text-3xl">
            {question.question}
          </h4>
        </div>
        <OptionList question={question} />
      </div>
      <Footer className="grid grid-cols-2 grid-rows-2	items-center gap-4">
        <Timer />
        {isNextBtnShown && (
          <Button
            onClickFn={onPassQuestion}
            className="col-start-2 row-start-1 flex h-20 items-center justify-center justify-self-end rounded-full border-2 border-gray-200 px-7 text-3xl normal-case text-gray-200 transition-all hover:scale-105"
          >
            <span>{isLastQuestionIdx ? "Finish" : "Next"}</span>
          </Button>
        )}
        <Button
          onClickFn={handleQuitClick}
          className="col-start-1 row-start-2 flex h-20 items-center justify-center justify-self-start rounded-full border-2 border-gray-200 px-7 text-3xl normal-case text-gray-200 transition-all hover:scale-105"
        >
          <span>Quit</span>
        </Button>

        {isAdmin && (
          <div className="col-start-2 row-start-2 flex  items-center justify-center gap-3 justify-self-end">
            <BtnMarkQuesitonToEdit
              isMarkedToBeRevised={isQuestionRevised}
              handleBtnMarkToEditClick={handleBtnMarkToEditClick}
            />
            <BtnApproveQuestion handleBtnApproveClick={handleBtnApproveClick} />
            <BtnQuestionEdit handleBtnEditClick={handleBtnEditClick} />
          </div>
        )}
      </Footer>
    </section>
  );
};
