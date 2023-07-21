import { useDispatch } from "react-redux";
import {
  ContactMessage,
  ContactMsgType,
  ReportQuestionMessage,
} from "../../../../../shared/types/system";
import { AppDispatch } from "../../../store/types";
import "./ContactMsgPreview.scss";
import { updateContactMsg } from "../../../store/actions/contact.actions";
import { ContactBtnContainer } from "../ContactBtnContainer/ContactBtnContainer";

type ContactMsgPreviewProps = {
  contactMsg: ContactMessage | ReportQuestionMessage;
};

export const ContactMsgPreview = ({ contactMsg }: ContactMsgPreviewProps) => {
  const dispatch: AppDispatch = useDispatch();
  const convertStringToDate = (date: string) => {
    return new Date(date).toISOString().split("T")[0];
  };

  function toggleMarkedAsRead() {
    dispatch(
      updateContactMsg(
        { ...contactMsg, markedAsRead: !contactMsg.markedAsRead } as ContactMessage,
        contactMsg.type as unknown as ContactMsgType
      )
    );
  }

  function toggleMarkedAsDone() {
    dispatch(
      updateContactMsg(
        { ...contactMsg, markedAsDone: !contactMsg.markedAsDone } as ContactMessage,
        contactMsg.type as unknown as ContactMsgType
      )
    );
  }

  function toggleMarkedAsSpam() {
    dispatch(
      updateContactMsg(
        { ...contactMsg, markedAsSpam: !contactMsg.markedAsSpam } as ContactMessage,
        contactMsg.type as unknown as ContactMsgType
      )
    );
  }

  function toggleMarkedAsImportant() {
    dispatch(
      updateContactMsg(
        { ...contactMsg, markedAsImportant: !contactMsg.markedAsImportant } as ContactMessage,
        contactMsg.type as unknown as ContactMsgType
      )
    );
  }

  function archiveContactMsg() {
    const isConfirmed = window.confirm("Are you sure you want to archive this message?");
    if (!isConfirmed) return;
    dispatch(
      updateContactMsg(
        { ...contactMsg, isArchived: !contactMsg.isArchived } as ContactMessage,
        contactMsg.type as unknown as ContactMsgType
      )
    );
  }

  function renderContent() {
    switch (contactMsg.type) {
      case "contact":
        return (
          <p>
            <strong>subject: </strong>
            {contactMsg.subject}
          </p>
        );

      case "report":
        return (
          <p>
            <strong>default issue: </strong>
            {contactMsg.defaultIssue}
          </p>
        );
      default:
        break;
    }
  }

  return (
    <div className="contact-msg-preview">
      <header>
        <div className="user-info">
          <p>{contactMsg.name},</p>
          <p>{contactMsg.email},</p>
          <p>{convertStringToDate(contactMsg.createdAt as unknown as string)}</p>
        </div>
        <ContactBtnContainer
          contactMsg={contactMsg as ContactMessage}
          toggleMarkedAsRead={toggleMarkedAsRead}
          toggleMarkedAsDone={toggleMarkedAsDone}
          toggleMarkedAsSpam={toggleMarkedAsSpam}
          toggleMarkedAsImportant={toggleMarkedAsImportant}
          archiveContactMsg={archiveContactMsg}
        />
      </header>
      <div className="msg-contect">
        {renderContent()}
        <p>
          <strong>content: </strong>
          {contactMsg.content}
        </p>
      </div>
    </div>
  );
};
