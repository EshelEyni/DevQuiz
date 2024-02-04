import { createContext, useContext, useEffect, useState } from "react";
import { useKey } from "react-use";
import { useQuiz } from "../../hooks/useQuiz";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/app.types";
import {
  resetQuizState,
  setAnswerIdx,
  setHighScore,
  setIsTimerOn,
  setNextQuestionIdx,
  setPoints,
  setStatus,
} from "../../store/slices/quizSlice";
import { updateQuestion } from "../../store/slices/questionSlice";
import { useAuth } from "../../hooks/useAuth";
import { Question } from "../../../../shared/types/question";
import { useNavigate } from "react-router-dom";
import userService from "../../services/user.service";

type QuestionContextType = {
  focusedBtn: string;
  question: Question;
  isNextBtnShown: boolean;
  isLastQuestionIdx: boolean;
  onPassQuestion: () => void;
  handleQuitClick: () => void;
  onOptionSelection: (optionIdx: number) => void;
};

const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined,
);

function QuestionProvider({ children }: { children: React.ReactNode }) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();

  const {
    questions,
    questionIdx,
    numQuestions,
    answerIdx,
    points,
    highScore,
    isTimerOn,
  } = useQuiz();

  const [focusedBtn, setFocusedBtn] = useState("");

  const question: Question = questions[questionIdx];
  const isAdmin = loggedInUser?.roles.includes("admin");
  const isNextBtnShown = answerIdx !== null;
  const isLastQuestionIdx = questionIdx === numQuestions - 1;

  useKey("Enter", handleEnterKey, {}, [focusedBtn]);
  useKey("ArrowRight", handleArrowRight, {}, [focusedBtn]);
  useKey("ArrowLeft", handleArrowLeft, {}, [focusedBtn]);
  useKey("ArrowUp", handleArrowUp, {}, [answerIdx, focusedBtn]);
  useKey("ArrowDown", handleArrowDown, {}, [answerIdx, focusedBtn]);

  useKey("e", handleBtnEditClick, {}, [question.id, isAdmin]);
  useKey("a", handleBtnApproveClick, {}, [isAdmin, question.isRevised]);
  useKey("m", handleBtnMarkToEditClick, {}, [
    isAdmin,
    question?.isMarkedToBeRevised,
  ]);
  useKey("t", onToggleTimer, {}, [isTimerOn]);

  function handleArrowRight() {
    setFocusedBtn("next");
  }

  function handleArrowLeft() {
    setFocusedBtn("quit");
  }

  function handleArrowUp() {
    if (answerIdx) return;
    let newFocusedBtn = "";
    if (focusedBtn === "") newFocusedBtn = "option-1";
    else if (focusedBtn.includes("option")) {
      const idx = Number(focusedBtn.split("-")[1]);
      if (idx === 1) newFocusedBtn = `option-${numQuestions + 1}`;
      else newFocusedBtn = `option-${idx - 1}`;
    } else if (focusedBtn) newFocusedBtn = `option-${numQuestions + 1}`;
    else newFocusedBtn = "option-1";
    setFocusedBtn(newFocusedBtn);
  }

  function handleArrowDown() {
    if (answerIdx) return;
    let newFocusedBtn = "";
    if (focusedBtn.includes("option")) {
      const idx = Number(focusedBtn.split("-")[1]);
      if (idx === numQuestions + 1) newFocusedBtn = "option-1";
      else newFocusedBtn = `option-${idx + 1}`;
    } else newFocusedBtn = "option-1";
    setFocusedBtn(newFocusedBtn);
  }

  function handleEnterKey() {
    if (focusedBtn === "next") onPassQuestion();
    else if (focusedBtn === "quit") handleQuitClick();
    else if (focusedBtn.includes("option")) {
      const idx = Number(focusedBtn.split("-")[1]);
      onOptionSelection(idx - 1);
    }
    setFocusedBtn("");
  }

  function handleQuitClick() {
    dispatch(resetQuizState());
  }

  function onOptionSelection(optionIdx: number) {
    dispatch(setAnswerIdx(optionIdx));
    const isOptionCorrect = question.correctOption === optionIdx;
    if (!isOptionCorrect) return;
    dispatch(setPoints(question.points));
    if (!loggedInUser) return;
    userService.recordUserCorrectAnswer(question);
  }

  function onPassQuestion() {
    if (answerIdx === null) return;
    const isValidQuestionIdx =
      questionIdx >= 0 && questionIdx < numQuestions - 1;
    if (isValidQuestionIdx) dispatch(setNextQuestionIdx());
    else if (isLastQuestionIdx) {
      dispatch(setStatus("finished"));
      const isHighScore = points > highScore;
      if (isHighScore) dispatch(setHighScore(points));
    }
  }

  function onToggleTimer() {
    dispatch(setIsTimerOn(!isTimerOn));
  }

  function handleBtnEditClick() {
    if (!isAdmin) return;
    dispatch(setIsTimerOn(false));
    navigate(`question-edit/${question.id}`);
  }

  function handleBtnApproveClick() {
    if (!isAdmin) return;
    const questionToApprove = { ...question, isRevised: !question.isRevised };
    dispatch(updateQuestion(questionToApprove, "approve"));
  }

  function handleBtnMarkToEditClick() {
    if (!isAdmin) return;
    const isQuestionRevised = question.isMarkedToBeRevised ?? false;
    const updatedQuestion = {
      ...question,
      isMarkedToBeRevised: !isQuestionRevised,
    };
    dispatch(updateQuestion(updatedQuestion, "mark"));
  }

  useEffect(() => {
    function handleMouseMove() {
      if (focusedBtn === "") return;
      setFocusedBtn("");
    }

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [focusedBtn]);

  const value = {
    focusedBtn,
    question,
    isNextBtnShown,
    isLastQuestionIdx,
    onPassQuestion,
    handleQuitClick,
    onOptionSelection,
  };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestion() {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error("useQuestion must be used within a QuestionProvider");
  }
  return context;
}

export { QuestionProvider, useQuestion };
