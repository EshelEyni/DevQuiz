import { BtnQuestionEdit } from "../../components/Btns/BtnQuestionEdit";
import { Footer } from "../../components/Gen/Footer";
import { ProgressBar } from "./ProgressBar";
import { Timer } from "./Timer";
import { BtnApproveQuestion } from "../../components/Btns/BtnApproveQuestion";
import { BtnMarkQuesitonToEdit } from "../../components/Btns/BtnMarkQuesitonToEdit";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Btns/Button";
import classnames from "classnames";
import { BtnToggleTimer } from "../../components/Btns/BtnToggleTimer";
import { useQuestion as useQuestionContext } from "./QuestionContext";
import { useQuiz } from "../../hooks/useQuiz";
import { BtnArchiveQuestion } from "../../components/Btns/BtnArchiveQuestion";

export const Question = () => {
  const { loggedInUser } = useAuth();
  const isAdmin = loggedInUser?.roles.includes("admin");
  const {
    focusedBtn,
    question,
    isNextBtnShown,
    isLastQuestionIdx,
    onPassQuestion,
    handleQuitClick,
    onOptionSelection,
  } = useQuestionContext();
  const { answerIdx } = useQuiz();

  if (!question) return null;
  return (
    <section className="w-full max-w-[575px] px-14">
      <ProgressBar />
      <div>
        <div className="question-header">
          <h4 className="mb-16 text-4xl font-bold text-gray-50 md:text-3xl">
            {question.question}
          </h4>
        </div>
        <ul className="mb-4 flex flex-col gap-4">
          {question.options.map((option, idx) => {
            const isAnswered = answerIdx !== null;
            const isOptionAnswer = answerIdx === idx;
            const isOptionCorrect =
              isAnswered && question.correctOption === idx;
            const isOptionWrong = isAnswered && !isOptionCorrect;

            return (
              <Button
                className={classnames(
                  "option-display w-full cursor-pointer rounded-full bg-gray-600 px-10 py-5 text-left text-3xl transition-all duration-300",
                  {
                    "translate-x-10": isOptionAnswer,
                    correct: isOptionCorrect,
                    wrong: isOptionWrong,
                    "translate-x-5 !bg-gray-800 text-gray-200":
                      focusedBtn === `option-${idx + 1}`,
                    "!cursor-not-allowed": answerIdx !== null,
                  },
                )}
                onClickFn={() => onOptionSelection(idx)}
                disabled={isAnswered}
                key={idx}
              >
                {option}
              </Button>
            );
          })}
        </ul>
      </div>
      <Footer className="grid grid-cols-2 grid-rows-2	items-center gap-4">
        <Timer />
        {isNextBtnShown && (
          <Button
            onClickFn={onPassQuestion}
            className={classnames(
              "col-start-2 row-start-1 flex h-20 items-center justify-center justify-self-end rounded-full bg-gray-600 px-7 text-4xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",
              {
                "scale-110 bg-gray-800 text-gray-200": focusedBtn === "next",
              },
            )}
          >
            <span>{isLastQuestionIdx ? "Finish" : "Next"}</span>
          </Button>
        )}
        <Button
          onClickFn={handleQuitClick}
          className={classnames(
            "col-start-1 row-start-2 flex h-20 items-center justify-center justify-self-start rounded-full bg-gray-600 px-7 text-4xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",
            {
              "scale-110 bg-gray-800 text-gray-200": focusedBtn === "quit",
            },
          )}
        >
          <span>Quit</span>
        </Button>

        {isAdmin && (
          <div className="col-start-2 row-start-2 flex  items-center justify-center gap-3 justify-self-end">
            <BtnToggleTimer />
            <BtnMarkQuesitonToEdit question={question} />
            <BtnApproveQuestion question={question} />
            <BtnQuestionEdit questionId={question.id} />
            <BtnArchiveQuestion question={question} />
          </div>
        )}
      </Footer>
    </section>
  );
};
