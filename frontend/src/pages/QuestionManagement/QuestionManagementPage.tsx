import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { QuestionSearchBar } from "./QuestionSearchBar";
import { useEffect } from "react";
import { QuestionLoader } from "../../components/Loaders/QuestionLoader/QuestionLoader";
import { useQuestion } from "../../hooks/useQuestion";
import { getQuestions } from "../../store/slices/questionSlice";
import { AppDispatch } from "../../types/app.types";
import { getRandomBrightColor } from "../../services/utils.service";
import { QuestionPreview } from "./QuestionPreview";
import { useIntersectionPagination } from "../../hooks/useIntersectionPagination";

const QuestionManagementPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { questions, getQuestionsState } = useQuestion();
  const { paginationIdx, intersectionRef } = useIntersectionPagination();
  const isLoading = getQuestionsState.state === "loading";
  const noQuestionsFound = !isLoading && questions.length === 0;
  const isQuestionListShown = !isLoading && questions.length > 0;
  const approvedQuestions = questions.filter(question => question.isRevised);
  const percentageOfApprovedQuestions = Math.round(
    (approvedQuestions.length / questions.length) * 100,
  );

  useEffect(() => {
    dispatch(
      getQuestions({
        language: "HTML",
        level: "beginner",
        limit: 0,
      }),
    );
  }, [dispatch]);

  return (
    <main className="flex w-screen flex-col items-center">
      <QuestionSearchBar />
      {isLoading && <QuestionLoader />}

      {noQuestionsFound && (
        <h2 className="mt-14 text-center text-2xl font-bold">
          No questions found.⚠️ Please try another search.
        </h2>
      )}

      {isQuestionListShown && (
        <div className="mx-auto mt-4 flex w-11/12 flex-col gap-5 pb-24 md:mt-2">
          <div className="flex w-full flex-col flex-wrap justify-between gap-1 md:flex-row">
            <p className="text-3xl font-semibold leading-none">{`Number of Questions: ${questions.length}`}</p>
            <p className="text-3xl font-semibold leading-none">{`Number of Approved Questions: ${approvedQuestions.length}`}</p>
            <p className="text-3xl font-semibold leading-none">
              <em className="mr-[4px]">{percentageOfApprovedQuestions}%</em>
              of the questions have been approved.
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {questions.slice(0, 40 * paginationIdx).map((q, i) => (
              <QuestionPreview
                key={`${q.id}-${i + 1}`}
                question={q}
                bcgColor={getRandomBrightColor(i)}
              />
            ))}
          </ul>
          <div className="h-40 w-full" ref={intersectionRef} />
        </div>
      )}
      <Outlet />
    </main>
  );
};

export default QuestionManagementPage;
