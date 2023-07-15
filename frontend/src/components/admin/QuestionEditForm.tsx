import React from "react";
import { Question as TypeOfQuestion } from "../../../../shared/types/question";

type QuestionEditFormProps = {
  question: TypeOfQuestion;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeTextArea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
};

export const QuestionEditForm = ({
  question,
  handleChange,
  handleChangeTextArea,
  handleSubmit,
}: QuestionEditFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Language:
        <input
          type="text"
          name="language"
          value={question.language}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Question:
        <textarea
          name="question"
          value={question.question}
          onChange={handleChangeTextArea}
          required
        />
      </label>
      <label>
        Options:
        {question.options.map((option, index) => (
          <input
            key={index}
            type="text"
            name={`option${index}`}
            value={option}
            onChange={handleChange}
            required
          />
        ))}
      </label>
      <label>
        Correct Option:
        <input
          type="number"
          name="correctOption"
          value={question.correctOption}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Level:
        <input type="text" name="level" value={question.level} onChange={handleChange} required />
      </label>
      <label>
        Points:
        <input
          type="number"
          name="points"
          value={question.points}
          onChange={handleChange}
          required
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};
