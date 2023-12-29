import { useDispatch } from "react-redux";
import { ManagementEntityList } from "../../components/Management/ManagementEntityList/ManagementEntityList";
import { AppDispatch } from "../../store/types";
import { Outlet } from "react-router-dom";
import { QuestionSearchBar } from "../../components/Input/QuestionSearchBar/QuestionSearchBar";
import { useEffect } from "react";
import "./QuestionManagementPage.scss";
import { QuestionLoader } from "../../components/Loaders/QuestionLoader/QuestionLoader";
import { NoResMsg } from "../../components/Msg/NoResMsg/NoResMsg";
import { ManagementEntityListContainer } from "../../components/Management/ManagementEntityListContainer/ManagementEntityListContainer";
import { ManagementEntityCounter } from "../../components/Management/ManagementEntityCounter/ManagementEntityCounter";
import { useQuestion } from "../../hooks/useQuestion";
import { getQuestions } from "../../store/slices/questionSlice";

export const QuestionManagementPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { questions, getQuestionsState } = useQuestion();
  const isLoading = getQuestionsState.state === "loading";
  const noQuestionsFound = !isLoading && questions.length === 0;
  const approvedQuestions = questions.filter(question => question.isRevised);
  const percentageOfApprovedQuestions = Math.round(
    (approvedQuestions.length / questions.length) * 100,
  );

  useEffect(() => {
    dispatch(
      getQuestions({
        language: "HTML",
        level: "beginner",
        page: 1,
        limit: 1000,
        isEditPage: true,
        isMarkedToBeRevised: true,
      }),
    );
  }, [dispatch]);

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
              <div className="question-data-details">
                <div>
                  <ManagementEntityCounter
                    title="Questions"
                    count={questions.length}
                  />
                  <ManagementEntityCounter
                    title="Approved Questions"
                    count={approvedQuestions.length}
                  />
                </div>
                <p className="percentage-of-approved-questions">
                  <em>{percentageOfApprovedQuestions}%</em>
                  of the questions have been approved.
                </p>
              </div>
              <ManagementEntityList entities={questions} />
            </>
          )}
        </ManagementEntityListContainer>
      )}
      <Outlet />
    </main>
  );
};
