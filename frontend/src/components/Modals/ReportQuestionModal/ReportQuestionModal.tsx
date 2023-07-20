import { ChangeEvent, useState, useEffect, useRef } from "react";
import { AppDispatch } from "../../../store/types";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsReportQuestionModalOpen } from "../../../store/actions/modal.actions";
import { ReportQuestionMessage } from "../../../../../shared/types/system";
import { RootState } from "../../../store/store";
import { senReportOnQuestion } from "../../../services/contact.service";
import { Loader } from "../../Loaders/Loader/Loader";
import { ReportQuestionForm } from "../../Form/ReportQuestionForm/ReportQuestionForm";
import { setIsTimerOn } from "../../../store/actions/quiz.actions";
import "./ReportQuestionModal.scss";

export const ReportQuestionModal = () => {
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);
  const { questions, questionIdx } = useSelector((state: RootState) => state.quizModule);
  const question = questions[questionIdx];
  const defaultMsgState: ReportQuestionMessage = {
    content: "",
    defaultIssue: "",
    questionId: question.id,
  };
  const [message, setMessage] = useState(defaultMsgState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const subjectInputRef = useRef<HTMLInputElement | null>(null);
  const isBtnDisabled = (!message.content && !message.defaultIssue) || !message.questionId;
  const defaultReports = [
    "-- Please choose an issue --",
    "The question is not clear",
    "The answer is not correct",
    "The question is not relevant",
    "The question is not up to date",
    "The question is not in the right level",
    "The question is not in the right category",
    "This is a duplicate question",
  ].map((report, i) => (
    <option key={i} value={report}>
      {report}
    </option>
  ));

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();
    const msgToSend: ReportQuestionMessage = { ...message };
    if (loggedinUser) msgToSend.userDetails = { ...loggedinUser };
    await senReportOnQuestion(msgToSend);
    setMessage({ ...defaultMsgState });
    dispatch(toggleIsReportQuestionModalOpen());
  }

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setMessage(prevState => ({ ...prevState, defaultIssue: value }));
  }

  function handleChangeTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setMessage(prevState => ({ ...prevState, content: value }));
  }

  useEffect(() => {
    if (subjectInputRef.current) subjectInputRef.current.focus();

    return () => {
      setMessage({ ...defaultMsgState });
      dispatch(setIsTimerOn(true));
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="modal-report-question">
          <h2>Report a Question</h2>
          <div className="question-preview">
            <h5>{question.question}</h5>
            <ul>
              {question.options.map((option, i) => (
                <li key={i}>{`${i + 1}) ${option}`}</li>
              ))}
            </ul>
          </div>
          <ReportQuestionForm
            message={message}
            handleChange={handleChange}
            handleChangeTextArea={handleChangeTextArea}
            handleSubmit={handleSubmit}
            isBtnDisabled={isBtnDisabled}
            defaultReports={defaultReports}
          />
        </section>
      )}
    </>
  );
};
