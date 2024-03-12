import { FC } from "react";
import { QuestionPreview } from "./QuestionPreview";
import { getRandomBrightColor } from "../../services/utils.service";
import { QuestionLoader } from "../../components/Loaders/QuestionLoader/QuestionLoader";
import { useQuestion } from "../../hooks/useQuestion";
import { useIntersectionPagination } from "../../hooks/useIntersectionPagination";

type QuestionListProps = {
  noResMsg?: string;
};

export const QuestionList: FC<QuestionListProps> = ({
  noResMsg = "No questions found.⚠️ Please try another search.",
}) => {
  const { paginationIdx, intersectionRef } = useIntersectionPagination();

  const { questions, getQuestionsState } = useQuestion();

  const approvedQuestions = questions.filter(question => question.isRevised);
  const percentageOfApprovedQuestions = Math.round(
    (approvedQuestions.length / questions.length) * 100,
  );
  const noQuestionsFound =
    getQuestionsState.state === "succeeded" && questions.length === 0;
  const isQuestionListShown =
    getQuestionsState.state !== "loading" && questions.length > 0;

  return (
    <>
      {getQuestionsState.state === "loading" && <QuestionLoader />}

      {getQuestionsState.state === "failed" && (
        <div>
          <h2 className="mt-14 text-center text-3xl font-bold">
            Something went wrong. Please try again later.
          </h2>
          {getQuestionsState.error && (
            <p className="mt-4 text-center text-2xl">
              {getQuestionsState.error}
            </p>
          )}
        </div>
      )}
      {noQuestionsFound && (
        <h2 className="mt-14 text-center text-2xl font-bold">{noResMsg}</h2>
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
    </>
  );
};
