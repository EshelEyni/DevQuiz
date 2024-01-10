import { useDispatch } from "react-redux";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { Error } from "../../components/Msg/Error/Error";
import { StartScreen } from "../../components/Screens/StartScreen/StartScreen";
import { Question } from "../../components/Question/Question/Question";
import { FinishScreen } from "../../components/Screens/FinishScreen/FinishScreen";
import { QuizHeader } from "../../components/Quiz/QuizHeader/QuizHeader";
import { Main } from "../../components/Gen/Main";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useQuiz } from "../../hooks/useQuiz";
import { startNewQuiz } from "../../store/slices/quizSlice";
import { AppDispatch } from "../../types/app.types";

export const Homepage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, language, level, page } = useQuiz();

  function renderSwitch(status: string) {
    switch (status) {
      case "loading":
        return <Loader title={"Loading questions..."} />;
      case "error":
        return <Error />;
      case "ready":
        return <StartScreen />;
      case "active":
        return <Question />;
      case "finished":
        return <FinishScreen />;
      default:
        return <></>;
    }
  }

  useEffect(() => {
    dispatch(startNewQuiz({ language, level, page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <QuizHeader />
      <Main>{renderSwitch(status)}</Main>
      <Outlet />
    </>
  );
};
