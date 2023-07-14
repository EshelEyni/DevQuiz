import { useDispatch, useSelector } from "react-redux";
import "./styles/main.scss";
import { RootState } from "./store/store";
import { AppDispatch } from "./store/types";
import { Question as TypeOfQuestion } from "../../shared/types/question";
import Loader from "./components/loaders/Loader";
import Error from "./components/msg/Error";
import StartScreen from "./components/screens/StartScreen";
import ProgressBar from "./components/ProgressBar";
import Question from "./components/Question";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import BtnNext from "./components/btns/BtnNext";
import FinishScreen from "./components/screens/FinishScreen";
import QuizHeader from "./components/QuizHeader";
import Main from "./components/Main";
import { use, useEffect } from "react";
import { getCurrentLogo } from "./services/image.service";
import { getQuestions } from "./store/actions/quiz.actions";
import { getSystemSettings } from "./store/actions/system.actions";
import Header from "./components/Header";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { questions, questionIdx, points, answerIdx, highScore } = useSelector(
    (state: RootState) => state.quizModule
  );
  const { status, language, level, offSet } = useSelector((state: RootState) => state.systemModule);
  const numQuestions: number = questions ? questions.length : 0;
  const maxPossiblePoints = questions.reduce(
    (acc: number, curr: TypeOfQuestion) => acc + curr.points,
    0
  );

  function changeFavicon() {
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "shortcut icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.type = "image/x-icon";
    console.log(language);
    link.href = getCurrentLogo(language);
  }

  function renderSwitch(status: string) {
    switch (status) {
      case "loading":
        return <Loader />;
      case "error":
        return <Error />;
      case "ready":
        return <StartScreen numQuestions={numQuestions} />;
      case "active":
        return (
          <>
            <ProgressBar
              index={questionIdx}
              numOfQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answerIdx={answerIdx}
            />
            <Question question={questions[questionIdx]} answerIdx={answerIdx} />
            <Footer>
              <Timer />
              <BtnNext
                answerIdx={answerIdx}
                questionIdx={questionIdx}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        );
      case "finished":
        return (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
          />
        );
      default:
        return <></>;
    }
  }

  useEffect(() => {
    dispatch(getSystemSettings());
  }, []);

  useEffect(() => {
    changeFavicon();
    dispatch(getQuestions({ language, level, offSet }));
  }, [language]);

  return (
    <div className="app">
      <Header />
      <QuizHeader />
      <Main>{renderSwitch(status)}</Main>
    </div>
  );
}

export default App;
