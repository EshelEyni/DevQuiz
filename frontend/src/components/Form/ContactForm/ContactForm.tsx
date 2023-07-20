import React from "react";

type ContactFormProps = {
  message: {
    subject: string;
    content: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeTextArea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  subjectInputRef: React.RefObject<HTMLInputElement>;
};

export const ContactForm = ({
  message,
  handleChange,
  handleChangeTextArea,
  handleSubmit,
  subjectInputRef,
}: ContactFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Subject:
        <input
          type="text"
          value={message.subject}
          onChange={handleChange}
          required
          ref={subjectInputRef}
        />
      </label>
      <label>
        Message:
        <textarea value={message.content} onChange={handleChangeTextArea} required />
      </label>
      <button type="submit" disabled={!message.content || !message.subject}>
        Send
      </button>
    </form>
  );
};
