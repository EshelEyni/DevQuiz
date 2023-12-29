import React from "react";
import { Question as TypeOfQuestion } from "../../../../../shared/types/question";
import { caplitalizeFirstLetter } from "../../../services/utils.service";
import { systemSettings } from "../../../config";

type QuestionEditFormProps = {
  question: TypeOfQuestion;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleChangeTextArea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
};

export const QuestionEditForm = ({
  question,
  handleChange,
  handleChangeTextArea,
  handleSubmit,
}: QuestionEditFormProps) => {
  const { programmingLanguages, difficultyLevels } = systemSettings;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Language:
        <select
          name="language"
          value={question.language}
          onChange={handleChange}
          required
        >
          {Object.keys(programmingLanguages).map((lang: string) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
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
            name={`option-${index}`}
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
          value={question.correctOption + 1}
          onChange={handleChange}
          min={0}
          max={question.options.length}
          required
        />
      </label>
      <label>
        Level:
        <select
          name="level"
          value={question.level}
          onChange={handleChange}
          required
        >
          {difficultyLevels.map((level: string) => (
            <option key={level} value={level}>
              {caplitalizeFirstLetter(level)}
            </option>
          ))}
        </select>
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
      <button type="submit">Save</button>
    </form>
  );
};
