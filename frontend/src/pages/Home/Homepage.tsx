import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AppDispatch } from "../../store/types";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { Error } from "../../components/Msg/Error/Error";
import { StartScreen } from "../../components/Screens/StartScreen/StartScreen";
import { Question } from "../../components/Question/Question/Question";
import { FinishScreen } from "../../components/Screens/FinishScreen/FinishScreen";
import { QuizHeader } from "../../components/Quiz/QuizHeader/QuizHeader";
import { Main } from "../../components/Gen/Main";
import { useEffect } from "react";
import { startNewQuiz } from "../../store/actions/quiz.actions";
import { ModalContainer } from "../../components/Modals/ModalContainer/ModalContainer";
import { Outlet } from "react-router-dom";

export const Homepage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, language, level, page } = useSelector((state: RootState) => state.systemModule);

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

    return () => {
      dispatch(startNewQuiz({ language, level, page }));
    };
  }, [language, level, page]);

  return (
    <>
      <QuizHeader />
      <Main>{renderSwitch(status)}</Main>
      <Outlet />
      <ModalContainer />
    </>
  );
};
