import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { QuestionList } from "../components/admin/QuestionList";
import { AppDispatch } from "../store/types";
import { getCurrentLogo } from "../services/image.service";
import { useFavicon } from "react-use";
import { Outlet } from "react-router-dom";
import { QuestionSearchBar } from "../components/admin/QuestionSearchBar";
import { getQuestions } from "../store/actions/question.actions";
import { useEffect } from "react";

export const AdminPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const { questions } = useSelector((state: RootState) => state.quizModule);
  const { language } = useSelector((state: RootState) => state.systemModule);
  useFavicon(getCurrentLogo(language));

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
      <div className="question-list-container">
        <p className="question-counter">{`Number of Question: ${questions.length}`}</p>
        {questions.length === 0 ? (
          <h1>No questions yet</h1>
        ) : (
          <QuestionList questions={questions} />
        )}
      </div>
      <Outlet />
    </main>
  );
};
