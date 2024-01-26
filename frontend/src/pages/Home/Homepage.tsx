import { useDispatch } from "react-redux";
import { Loader } from "../../components/Loaders/Loader/Loader";
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

const Homepage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, language, level, page, questions } = useQuiz();

  function renderSwitch(status: string) {
    switch (status) {
      case "loading":
        return <Loader title={"Loading questions..."} />;
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
        return <Question />;
      case "finished":
        return <FinishScreen />;
      default:
        return <></>;
    }
  }

  useEffect(() => {
    if (questions.length > 0) return;
    dispatch(startNewQuiz({ language, level, page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <QuizHeader />
      <Main>{renderSwitch(status)}</Main>
      <Outlet />
    </div>
  );
};

export default Homepage;
