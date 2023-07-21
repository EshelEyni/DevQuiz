import { useEffect } from "react";
import "./ContactManagementPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/types";
import { getContactMsgs } from "../../store/actions/contact.actions";
import { RootState } from "../../store/store";
import { ContactMsgs } from "../../../../shared/types/system";
import { ManagementEntityCounter } from "../../components/Management/ManagementEntityCounter/ManagementEntityCounter";
import { ContactMsgList } from "../../components/Contact/ContactMsgList/ContactMsgList";

export const ContactManagementPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { contactMsgs } = useSelector((state: RootState) => state.contactMsgModule);

  const [contactMsgsCurrDay, contactMsgsPrevWeek, contactMsgsPrevMonth, contactMsgsBeforePrevMonth] =
    contactMsgs.reduce(
      (acc: Array<ContactMsgs>, contactMsg) => {
        const currDate = new Date();
        const currDay = currDate.getDate();
        const currMonth = currDate.getMonth();
        const currYear = currDate.getFullYear();
        const msgDate = new Date(contactMsg.createdAt);
        const msgDay = msgDate.getDate();
        const msgMonth = msgDate.getMonth();
        const msgYear = msgDate.getFullYear();

        if (currDay === msgDay && currMonth === msgMonth && currYear === msgYear)
          acc[0].push(contactMsg);
        else if (currDay - msgDay <= 7 && currMonth === msgMonth && currYear === msgYear)
          acc[1].push(contactMsg);
        else if (currMonth - msgMonth <= 1 && currYear === msgYear) acc[2].push(contactMsg);

        return acc;
      },
      [[], [], [],[]]
    );

  useEffect(() => {
    dispatch(getContactMsgs());
  }, []);

  return (
    <main className="contact-management-page">
      <h2 className="title">Contact Management Page</h2>
      <ManagementEntityCounter title="Contact Messages" count={contactMsgs.length} />
      <ContactMsgList title="today" contactMsgs={contactMsgsCurrDay} />
      <ContactMsgList title="week" contactMsgs={contactMsgsPrevWeek} />
      <ContactMsgList title="month" contactMsgs={contactMsgsPrevMonth} />
      <ContactMsgList title="Previous" contactMsgs={contactMsgsBeforePrevMonth} />
    </main>
  );
};
