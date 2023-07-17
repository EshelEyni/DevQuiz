import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { QuestionList } from "../components/admin/QuestionList";
import { AppDispatch } from "../store/types";
import { Outlet } from "react-router-dom";
import { QuestionSearchBar } from "../components/admin/QuestionSearchBar";
import { getQuestions } from "../store/actions/question.actions";
import { useEffect } from "react";
import { Loader } from "../components/loaders/Loader";
import { ContactModal } from "../components/modals/ContactModal";
import { toggleIsContactModalOpen } from "../store/actions/modal.actions";
import { Modal } from "../components/modals/Modal";

export const AdminPage = () => {
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
    <main className="admin-page">
      <QuestionSearchBar />
      {isLoading && <Loader title="Getting questions" />}
      <div className="question-list-container">
        <p className="question-counter">{`Number of Question: ${questions.length}`}</p>
        {noQuestionsFound ? (
          <div className="msg-container">
            <h2 className="msg-no-question-found">
              No question found.⚠️ Please try another search.
            </h2>
          </div>
        ) : (
          <QuestionList questions={questions} />
        )}
      </div>
      <Outlet />
      {isContactOpen && (
        <Modal onClickMainScreenFn={toggleIsContactModalOpen}>
          <ContactModal />
        </Modal>
      )}
    </main>
  );
};
