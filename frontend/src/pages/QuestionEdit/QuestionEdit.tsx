import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Question } from "../../../../shared/types/question";
import { updateQuestion } from "../../store/actions/question.actions";
import { AppDispatch } from "../../store/types";
import { useDispatch } from "react-redux";
import questionService from "../../services/question.service";
import { setIsTimerOn } from "../../store/actions/quiz.actions";
import "./QuestionEdit.scss";
import { Loader } from "../../components/Loaders/Loader/Loader";
import { QuestionEditForm } from "../../components/Form/QuestionEditForm/QuestionEditForm";

export const QuestionEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchQuestion(id: string) {
    const question = await questionService.getById(id);
    if (!question) return;
    setIsLoading(false);
    setQuestion(question);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (!question) return;
    const { name, value } = event.target;
    if (name === "correctOption") {
      setQuestion({ ...question, [name]: Number(value) - 1 });
      return;
    }
    if (name.startsWith("option-")) {
      const index = Number(name.split("-")[1]);
      const options = [...question.options];
      options[index] = value;
      setQuestion({ ...question, options });
      return;
    }
    setQuestion({ ...question, [name]: value });
  }

  function handleChangeTextArea(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!question) return;
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question) return;
    dispatch(updateQuestion(question));
    onGoBack();
  }

  function onGoBack() {
    navigate(-1);
    dispatch(setIsTimerOn(true));
  }

  useEffect(() => {
    const { id } = params;
    if (id) fetchQuestion(id);
  }, []);

  return (
    <>
      <div className="main-screen dark" onClick={onGoBack}></div>
      <div className="question-edit">
        <h2>Question Edit</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <QuestionEditForm
            question={question!}
            handleChange={handleChange}
            handleChangeTextArea={handleChangeTextArea}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
};
