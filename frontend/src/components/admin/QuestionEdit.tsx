import { QuestionEditForm } from "./QuestionEditForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { Question } from "../../../../shared/types/question";
import questionService from "../../services/question.service";
import Loader from "../loaders/Loader";

export const QuestionEdit = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchQuestion(id: string) {
    const question = await questionService.getById(id);
    if (!question) return;
    setIsLoading(false);
    setQuestion(question);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!question) return;
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  }

  function handleChangeTextArea(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!question) return;
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  useEffect(() => {
    const { id } = params;
    if (id) fetchQuestion(id);
  }, []);

  return (
    <div>
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
  );
};
