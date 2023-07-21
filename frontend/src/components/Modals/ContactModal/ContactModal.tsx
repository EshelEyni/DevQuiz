import { ChangeEvent, useState, useEffect, useRef } from "react";
import { AppDispatch } from "../../../store/types";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsContactModalOpen } from "../../../store/actions/modal.actions";
import { ContactMessageContent } from "../../../../../shared/types/system";
import { RootState } from "../../../store/store";
import contactService from "../../../services/contact.service";
import { Loader } from "../../Loaders/Loader/Loader";
import { ContactForm } from "../../Form/ContactForm/ContactForm";

const defaultMsgState: ContactMessageContent = {
  subject: "",
  content: "",
};

export const ContactModal = () => {
  const { loggedinUser } = useSelector((state: RootState) => state.authModule);
  const [message, setMessage] = useState(defaultMsgState);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const subjectInputRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    setIsLoading(true);
    event.preventDefault();
    const msgToSend: ContactMessageContent = {
      ...message,
    };
    if (loggedinUser) msgToSend.userDetails = { ...loggedinUser };
    await contactService.sendContactMessage(msgToSend);
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
          <ContactForm
            message={message}
            handleChange={handleChange}
            handleChangeTextArea={handleChangeTextArea}
            handleSubmit={handleSubmit}
            subjectInputRef={subjectInputRef}
          />
        </section>
      )}
    </>
  );
};
