import { ChangeEvent, useState, useEffect, useRef } from "react";
import { AppDispatch } from "../../store/types";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsContactModalOpen } from "../../store/actions/system.actions";
import { ContactMessage } from "../../../../shared/types/system";
import { RootState } from "../../store/store";
import { sendContactMessage } from "../../services/contact.service";
import Loader from "../loaders/Loader";

const defaultMsgState: ContactMessage = {
  subject: "",
  content: "",
};

export default function ContactModal() {
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);
  const [message, setMessage] = useState(defaultMsgState);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const subjectInputRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();
    const msgToSend: ContactMessage = {
      ...message,
      userDetails: loggedinUser ? { ...loggedinUser } : null,
    };
    await sendContactMessage(msgToSend);
    setMessage({ ...defaultMsgState });
    dispatch(toggleIsContactModalOpen());
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setMessage(prevState => ({ ...prevState, subject: value }));
  }

  function handleChangeTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setMessage(prevState => ({ ...prevState, content: value }));
  }

  useEffect(() => {
    if (subjectInputRef.current) subjectInputRef.current.focus();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h2>Contact Us</h2>
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
        </section>
      )}
    </>
  );
}
