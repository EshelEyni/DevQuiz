import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AppDispatch } from "../store/types";
import { Question as TypeOfQuestion } from "../../../shared/types/question";
import Loader from "../components/loaders/Loader";
import Error from "../components/msg/Error";
import StartScreen from "../components/screens/StartScreen";
import ProgressBar from "../components/ProgressBar";
import Question from "../components/Question";
import Footer from "../components/Footer";
import Timer from "../components/Timer";
import BtnNext from "../components/btns/BtnNext";
import FinishScreen from "../components/screens/FinishScreen";
import QuizHeader from "../components/QuizHeader";
import Main from "../components/Main";
import { useEffect } from "react";
import { getCurrentLogo } from "../services/image.service";
import { getQuestions } from "../store/actions/quiz.actions";
import {
  getSystemSettings,
  toggleIsContactModalOpen,
  toggleIsLoginSignupModalOpen,
  toggleIsReportQuestionModalOpen,
} from "../store/actions/system.actions";
import Header from "../components/Header";
import ContactModal from "../components/modals/ContactModal";
import ReportQuestionModal from "../components/modals/ReportQuestionModal";
import Modal from "../components/modals/Modal";
import { useFavicon } from "react-use";
import LoginSignupModal from "../components/modals/LoginSignupModal";
import { autoLogin } from "../store/actions/auth.actions";

export const Homepage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { questions, questionIdx, points, highScore, answerIdx } = useSelector(
    (state: RootState) => state.quizModule
  );
  const {
    status,
    language,
    level,
    offSet,
    isContactModalOpen,
    isReportQuestionModalOpen,
    isLoginSignupModalOpen,
  } = useSelector((state: RootState) => state.systemModule);
  const numQuestions: number = questions ? questions.length : 0;
  const maxPossiblePoints = questions.reduce(
    (acc: number, curr: TypeOfQuestion) => acc + curr.points,
    0
  );
  useFavicon(getCurrentLogo(language));

  function renderSwitch(status: string) {
    switch (status) {
      case "loading":
        return <Loader title={"Loading questions..."} />;
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
            />
            <Question question={questions[questionIdx]} />
            <Footer>
              <Timer />
              {answerIdx !== null && (
                <BtnNext questionIdx={questionIdx} numQuestions={numQuestions} />
              )}
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
    dispatch(autoLogin());
  }, []);

  useEffect(() => {
    dispatch(getQuestions({ language, level, offSet }));
  }, [language, level]);

  return (
    <>
      <QuizHeader />
      <Main>{renderSwitch(status)}</Main>
      {isContactModalOpen && (
        <Modal onClickMainScreenFn={toggleIsContactModalOpen}>
          <ContactModal />
        </Modal>
      )}
      {isReportQuestionModalOpen && (
        <Modal onClickMainScreenFn={toggleIsReportQuestionModalOpen}>
          <ReportQuestionModal />
        </Modal>
      )}

      {isLoginSignupModalOpen && (
        <Modal onClickMainScreenFn={toggleIsLoginSignupModalOpen} type="login-signup">
          <LoginSignupModal />
        </Modal>
      )}
    </>
  );
};
