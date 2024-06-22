import { useDispatch } from "react-redux";
import { StartScreen } from "./StartScreen";
import { Question } from "./Question";
import { FinishScreen } from "./FinishScreen";
import { QuizHeader } from "./QuizHeader";
import { Main } from "../../components/Gen/Main";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useQuiz } from "../../hooks/useQuiz";
import { startNewQuiz } from "../../store/slices/quizSlice";
import { AppDispatch } from "../../types/app.types";
import { ErrMsg } from "../../components/Msg/ErrMsg";
import { QuestionLoader } from "../../components/Loaders/QuestionLoader/QuestionLoader";
import { QuestionProvider } from "./QuestionContext";

const Homepage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, language, level, page, secondsPerQuestion, questions } =
    useQuiz();

  function renderSwitch(status: string) {
    switch (status) {
      case "loading":
        return <QuestionLoader />;
      case "error":
        return (
          <ErrMsg
            msg={
              "There was an error fetching questions. Please try again later."
            }
          />
        );
      case "ready":
        return <StartScreen />;
      case "active":
        return (
          <QuestionProvider>
            <Question />
          </QuestionProvider>
        );
      case "finished":
        return <FinishScreen />;
      default:
        return <></>;
    }
  }

  useEffect(() => {
    if (questions.length) return;
    dispatch(startNewQuiz({ language, level, page, secondsPerQuestion }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Main className="flex w-full flex-1 flex-col items-center pb-24">
      <QuizHeader />
      {renderSwitch(status)}
      <Outlet />
    </Main>
  );
};

export default Homepage;
