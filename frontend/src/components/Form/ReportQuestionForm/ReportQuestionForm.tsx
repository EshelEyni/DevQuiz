import React from "react";

type ReportQuestionFormProps = {
  message: {
    content: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeTextArea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  isBtnDisabled: boolean;
};

export const ReportQuestionForm = ({
  message,
  handleChange,
  handleChangeTextArea,
  handleSubmit,
  isBtnDisabled,
}: ReportQuestionFormProps) => {
  const defaultReports = [
    "-- Please choose an issue --",
    "The question is not clear",
    "The answer is not correct",
    "The question is not relevant",
    "The question is not up to date",
    "The question is not in the right level",
    "The question is not in the right category",
    "This is a duplicate question",
  ];
  return (
    <form onSubmit={handleSubmit}>
      <div className="select-container">
        <div className="select-wrapper">
          <select className="select" onChange={handleChange}>
            {defaultReports.map((report, i) => (
              <option key={i} value={report}>
                {report}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label>
        Other:
        <textarea value={message.content} onChange={handleChangeTextArea} />
      </label>
      <button type="submit" disabled={isBtnDisabled}>
        Send
      </button>
    </form>
  );
};
