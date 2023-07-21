import { ContactMessage, ReportQuestionMessage } from "../../../../../shared/types/system";
import "./ContactMsgPreview.scss";

type ContactMsgPreviewProps = {
  contactMsg: ContactMessage | ReportQuestionMessage;
};

export const ContactMsgPreview = ({ contactMsg }: ContactMsgPreviewProps) => {
  const convertStringToDate = (date: string) => {
    return new Date(date).toISOString().split("T")[0];
  };
  function renderSwitch() {
    switch (contactMsg.type) {
      case "contact":
        return (
          <>
            <p>{contactMsg.name}</p>
            <p>{contactMsg.email}</p>
            <p>{contactMsg.subject}</p>
            <p>
              {contactMsg.content.length > 50
                ? contactMsg.content.slice(0, 50) + "..."
                : contactMsg.content}
            </p>
            <p>{convertStringToDate(contactMsg.createdAt as unknown as string)}</p>
          </>
        );

      case "report":
        return (
          <>
            <p>{contactMsg.content}</p>
            <p>{convertStringToDate(contactMsg.createdAt as unknown as string)}</p>
          </>
        );

      default:
        break;
    }
  }

  return <div className="contact-msg-preview">{renderSwitch()}</div>;
};
