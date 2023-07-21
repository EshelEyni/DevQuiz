import { ContactMsgs } from "../../../../../shared/types/system";
import { ContactMsgPreview } from "../ContactMsgPreview/ContactMsgPreview";
import "./ContactMsgList.scss";

type ContactMsgListProps = {
  contactMsgs: ContactMsgs;
  title: string;
};
export const ContactMsgList = ({ contactMsgs, title }: ContactMsgListProps) => {
  return (
    <section className="contact-msgs-list">
      <div className="title-container">
        <h3 className="title">{title}</h3>
        <p className="count">
          {contactMsgs.length} {contactMsgs.length === 1 ? "message" : "messages"}
        </p>
      </div>
      <ul>
        {contactMsgs.map((contactMsg, idx) => (
          <li key={idx}>
            <ContactMsgPreview contactMsg={contactMsg} />
          </li>
        ))}

        {contactMsgs.length === 0 && <p>There are no contact messages</p>}
      </ul>
    </section>
  );
};
