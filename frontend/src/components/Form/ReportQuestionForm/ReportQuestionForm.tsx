import React from "react";

type ReportQuestionFormProps = {
  message: {
    content: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeTextArea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  defaultReports: JSX.Element[];
  isBtnDisabled: boolean;
};

export const ReportQuestionForm = ({
  message,
  handleChange,
  handleChangeTextArea,
  handleSubmit,
  defaultReports,
  isBtnDisabled,
}: ReportQuestionFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="select-container">
        <div className="select-wrapper">
          <select className="select" onChange={handleChange}>
            {defaultReports}
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
