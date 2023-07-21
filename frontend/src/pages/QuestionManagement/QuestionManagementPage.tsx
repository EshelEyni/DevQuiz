import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ManagementEntityList } from "../../components/Management/ManagementEntityList/ManagementEntityList";
import { AppDispatch } from "../../store/types";
import { Outlet } from "react-router-dom";
import { QuestionSearchBar } from "../../components/Input/QuestionSearchBar/QuestionSearchBar";
import { getQuestions } from "../../store/actions/question.actions";
import { useEffect } from "react";
import { ContactModal } from "../../components/Modals/ContactModal/ContactModal";
import { toggleIsContactModalOpen } from "../../store/actions/modal.actions";
import { Modal } from "../../components/Modals/Modal/Modal";
import "./QuestionManagementPage.scss";
import { QuestionLoader } from "../../components/Loaders/QuestionLoader/QuestionLoader";
import { NoResMsg } from "../../components/Msg/NoResMsg/NoResMsg";
import { ManagementEntityListContainer } from "../../components/Management/ManagementEntityListContainer/ManagementEntityListContainer";
import { ManagementEntityCounter } from "../../components/Management/ManagementEntityCounter/ManagementEntityCounter";

export const QuestionManagementPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { questions, isLoading } = useSelector((state: RootState) => state.questionModule);
  const { isContactOpen } = useSelector((state: RootState) => state.modalModule);
  const noQuestionsFound = !isLoading && questions.length === 0;

  useEffect(() => {
    dispatch(
      getQuestions({
        language: "HTML",
        level: "beginner",
        page: 1,
        limit: 1000,
      })
    );
  }, []);

  return (
    <main className="management-page question">
      <QuestionSearchBar />
      {isLoading ? (
        <QuestionLoader />
      ) : (
        <ManagementEntityListContainer>
          {noQuestionsFound ? (
            <NoResMsg title="question" />
          ) : (
            <>
              <ManagementEntityCounter title="Questions" count={questions.length} />
              <ManagementEntityList entities={questions} />
            </>
          )}
        </ManagementEntityListContainer>
      )}
      <Outlet />
      {isContactOpen && (
        <Modal onClickMainScreenFn={toggleIsContactModalOpen}>
          <ContactModal />
        </Modal>
      )}
    </main>
  );
};
